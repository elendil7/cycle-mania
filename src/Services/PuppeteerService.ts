import puppeteer from "puppeteer-extra";
import Adblocker from "puppeteer-extra-plugin-adblocker";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { existsSync, mkdirSync, readdirSync, rmdirSync } from "fs";
import { Browser } from "puppeteer";
import { join } from "path";
import { Symbols } from "../Utils/constants";

export default class PuppeteerService {
  private browsers: Map<string, Browser>;

  constructor() {
    // create a map of browsers (key: serviceName, value: browser)
    // each browser is a new instance of puppeteer's browser, and will be used to access a specific service (for services which lack an API)
    this.browsers = new Map<string, Browser>();

    // add adblocker and stealth plugins to puppeteer
    puppeteer.use(
      Adblocker({
        blockTrackers: true,
        blockTrackersAndAnnoyances: true,
        useCache: true,
      }),
    );
    puppeteer.use(StealthPlugin({}));

    // create paths for puppeteer cache (if do not exist /system/data/puppeteer)
    this.createPaths();
  }

  public async launchBrowser(serviceName: string) {
    // create arguments for puppeteer
    const puppeteerArgs = [
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

    // create paths (using __dirname) to the following folders:
    // ../../system
    // ../../system/cache
    // ../../system/cache/puppeteer
    // ../../system/cache/puppeteer/${serviceName}
    const system = join(__dirname, "../../system");
    const cache = join(__dirname, "../../system/cache");
    const puppeteerCache = join(__dirname, "../../system/cache/puppeteer");
    const serviceCache = join(
      __dirname,
      `../../system/cache/puppeteer/${serviceName}`,
    );

    // log all dirs
    /*     console.log(`system: ${system}`)
    console.log(`cache: ${cache}`)
    console.log(`puppeteerCache: ${puppeteerCache}`)
    console.log(`serviceCache: ${serviceCache}`) */

    // create subfolders ../../system/cache/puppeteer/${serviceName} if it does not exist
    // use the serviceName as the name of the subfolder
    // use FS sync

    // create directory "system" (if does not already exist)
    if (!existsSync(system)) {
      mkdirSync(system);
    }

    // create directory "cache" (if does not already exist)
    if (!existsSync(cache)) {
      mkdirSync(cache);
    }

    // create directory "puppeteer" (if does not already exist)
    if (!existsSync(puppeteerCache)) {
      mkdirSync(puppeteerCache);
    }

    // create directory "serviceName" (if does not already exist)
    if (!existsSync(serviceCache)) {
      mkdirSync(serviceCache);
    }

    const browser = await puppeteer.launch({
      headless: "new",
      args: puppeteerArgs,
      defaultViewport: {
        width: 1920,
        height: 1080,
        isMobile: false,
      },
      ignoreHTTPSErrors: true,
      dumpio: true,
      timeout: 0,
      product: "chrome",
      userDataDir: serviceCache,
      // using chromium, because adblock & stealth plugins are not supported by firefox
      /*       executablePath: join(
        __dirname,
        '../../system/browsers/chrome-win/chrome.exe'
      ) */
    });

    // store the browser in the map
    this.browsers.set(serviceName, browser);

    // return the browser
    return browser;
  }

  public async getBrowser(serviceName: string) {
    if (this.browsers.has(serviceName)) {
      return this.browsers.get(serviceName);
    } else {
      console.error(
        `${Symbols.FAILURE} Failed to find browser 
				"${serviceName}". This error should not happen - check code.`,
      );

      console.log(`${Symbols.LOADING} Trying to launch a new browser...`);

      // start a new browser in that service name
      return this.launchBrowser(serviceName);
    }
  }

  public createPaths() {
    // get path of the puppeteer cache folder, 1 level above the service cache folder
    const path = join(__dirname, "../../system/cache/puppeteer");

    // recursively create the path if it does not exist
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
  }

  public purgeCache() {
    // read paths of every dir in the ../system/cache/puppeteer folder
    const dirs = readdirSync(join(__dirname, "../../system/cache/puppeteer"));

    // loop through each dir
    for (const dir of dirs) {
      // if the dir name is not included in the Map of browsers (key)
      if (!this.browsers.has(dir)) {
        // delete the dir
        rmdirSync(join(__dirname, `../../system/cache/puppeteer/${dir}`), {
          recursive: true,
        });
      }
    }
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
