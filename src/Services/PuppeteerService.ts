import puppeteer from "puppeteer-extra";
import Adblocker from "puppeteer-extra-plugin-adblocker";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { existsSync, mkdirSync, readdirSync, rmdirSync } from "fs";
import { Browser } from "puppeteer";
import { join } from "path";
import { Symbols } from "../Utils/constants";
import { config_PUPPETEER } from "../../config";
import { logger } from "../Logging/Winston";

export default class PuppeteerService {
  // private field to store the most recent config
  private readonly _configPuppeteer: typeof config_PUPPETEER;
  // puppeteer config arguments
  private readonly _puppeteerArgs: string[];
  // create a map of browsers (key: serviceName, value: browser)
  // each browser is a new instance of puppeteer's browser, and will be used to access a specific service (for services which lack an API)
  private _browsers: Map<string, Browser>;

  constructor() {
    this._configPuppeteer = config_PUPPETEER;
    this._puppeteerArgs = [
      // '--autoplay-policy=user-gesture-required',
      // '--disable-background-networking',
      // '--disable-background-timer-throttling',
      // '--disable-backgrounding-occluded-windows',
      // '--disable-breakpad',
      // '--disable-client-side-phishing-detection',
      // '--disable-component-update',
      "--disable-default-apps",
      "--disable-dev-shm-usage",
      // '--disable-domain-reliability',
      // '--disable-extensions',
      "--disable-features=AudioServiceOutOfProcess",
      "--disable-hang-monitor",
      // '--disable-ipc-flooding-protection',
      "--disable-notifications",
      "--disable-offer-store-unmasked-wallet-cards",
      "--disable-popup-blocking",
      "--disable-print-preview",
      "--disable-prompt-on-repost",
      "--disable-renderer-backgrounding",
      "--disable-setuid-sandbox",
      "--disable-speech-api",
      "--disable-sync",
      "--hide-scrollbars",
      "--ignore-gpu-blacklist",
      "--metrics-recording-only",
      "--mute-audio",
      "--no-default-browser-check",
      "--no-first-run",
      "--no-pings",
      "--no-sandbox",
      "--no-zygote",
      // '--password-store=basic',
      "--use-gl=swiftshader",
      "--use-mock-keychain",
      "--wait-for-browser",
      "--window-position=0,0",
      "--ignore-certifcate-errors",
      "--ignore-certifcate-errors-spki-list",
      // '--window-size=1920,1080', // set browser window size
    ];
    this._browsers = new Map<string, Browser>();

    // add adblocker and stealth plugins to puppeteer
    puppeteer.use(
      Adblocker({
        blockTrackers: true,
        blockTrackersAndAnnoyances: true,
        useCache: true,
      }),
    );
    puppeteer.use(StealthPlugin({}));
  }

  // getters
  public get configPuppeteer() {
    return this._configPuppeteer;
  }

  public get puppeteerArgs() {
    return this._puppeteerArgs;
  }

  public get browsers() {
    return this._browsers;
  }

  public async getBrowser(serviceName: string): Promise<Browser> {
    // grab browser from the map
    const browser = this.browsers.get(serviceName);

    // if browser exists, return it
    if (this.browsers.has(serviceName) && browser) return browser;

    // if browser does not exist, launch a new browser
    logger.info(`${Symbols.LOADING} Trying to launch a new browser...`);
    // start a new browser in that service name
    return await this.launchBrowser(serviceName);
  }

  public createPaths() {
    // get path
    const path = config_PUPPETEER.path.cache;

    // recursively create the path if it does not exist
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  }

  public purgeCache() {
    const path = config_PUPPETEER.path.cache;

    // read paths of every dir in the ../system/cache/puppeteer folder
    const dirs = readdirSync(path);

    // loop through each dir
    for (const dir of dirs) {
      // if the dir name is not included in the Map of browsers (key)
      if (!this.browsers.has(dir)) {
        // delete the dir
        rmdirSync(`${path}/${dir}`),
          {
            recursive: true,
          };
      }
    }
  }

  public async launchBrowser(serviceName: string) {
    // get the path of the puppeteer cache folder from the config file
    const serviceCachePath = `${config_PUPPETEER.path.cache}/${serviceName}`;

    // create subfolders recursively (serviceCachePath) if it does not exist
    // use the serviceName as the name of the subfolder
    if (!existsSync(serviceCachePath)) {
      mkdirSync(serviceCachePath, { recursive: true });
    }

    const browser = await puppeteer.launch({
      headless: "new",
      args: this.puppeteerArgs,
      defaultViewport: {
        width: 1920,
        height: 1080,
        isMobile: false,
      },
      ignoreHTTPSErrors: true,
      dumpio: true,
      timeout: 0,
      product: "chrome",
      userDataDir: serviceCachePath,
    });

    // store the browser in the map
    this.browsers.set(serviceName, browser);

    // return the browser
    return browser;
  }
}

/* Here is a description of each configuration option:

headless: A boolean value that determines whether to run the browser in headless mode or not. When true, Puppeteer runs in headless mode, which means the browser won't render any UI elements. Defaults to true.

args: An array of command-line arguments to be passed to the Chromium process when launching. Here are the descriptions of each option used in the example:

--no-sandbox: Disables the sandboxing feature of Chromium. It's required when running Chromium in some Linux environments.
--disable-setuid-sandbox: Disables the setuid sandboxing feature of Chromium. It's also required when running Chromium in some Linux environments.
--disable-infobars: Hides the "Chrome is being controlled by automated test software" infobar that's displayed at the top of the page.
--window-position=0,0: Sets the position of the browser window on the screen. In this case, it sets the position to (0,0).
--ignore-certifcate-errors: Ignores certificate errors when navigating to HTTPS websites.
--ignore-certifcate-errors-spki-list: Specifies the list of public key hashes (SPKI) that are allowed to raise certificate errors.
defaultViewport: An object that specifies the default viewport size and whether to emulate a mobile device or not. Here are the descriptions of each option used in the example:

width: A number that specifies the width of the viewport in pixels.
height: A number that specifies the height of the viewport in pixels.
isMobile: A boolean value that determines whether to emulate a mobile device or not. Defaults to false.
ignoreHTTPSErrors: A boolean value that determines whether to ignore HTTPS-related errors or not. When true, Puppeteer ignores HTTPS-related errors such as expired or invalid certificates. Defaults to false.

userDataDir: A string that specifies the directory where Puppeteer should store browser profile data such as cookies, cache, and history. Defaults to a directory in the system's temporary folder. */
