const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const timeout = 5000;
    page.setDefaultTimeout(timeout);

    async function waitForSelectors(selectors, frame, timeout) {
      for (const selector of selectors) {
        try {
          return await waitForSelector(selector, frame, timeout);
        } catch (err) {
          console.error(err);
        }
      }
      throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
    }

    async function waitForSelector(selector, frame, timeout) {
      if (selector instanceof Array) {
        let element = null;
        for (const part of selector) {
          if (!element) {
            element = await frame.waitForSelector(part, { timeout });
          } else {
            element = await element.$(part);
          }
          if (!element) {
            throw new Error('Could not find element: ' + part);
          }
          element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
        }
        if (!element) {
          throw new Error('Could not find element: ' + selector.join('|'));
        }
        return element;
      }
      const element = await frame.waitForSelector(selector, { timeout });
      if (!element) {
        throw new Error('Could not find element: ' + selector);
      }
      return element;
    }

    async function waitForElement(step, frame, timeout) {
      const count = step.count || 1;
      const operator = step.operator || '>=';
      const comp = {
        '==': (a, b) => a === b,
        '>=': (a, b) => a >= b,
        '<=': (a, b) => a <= b,
      };
      const compFn = comp[operator];
      await waitForFunction(async () => {
        const elements = await querySelectorsAll(step.selectors, frame);
        return compFn(elements.length, count);
      }, timeout);
    }

    async function querySelectorsAll(selectors, frame) {
      for (const selector of selectors) {
        const result = await querySelectorAll(selector, frame);
        if (result.length) {
          return result;
        }
      }
      return [];
    }

    async function querySelectorAll(selector, frame) {
      if (selector instanceof Array) {
        let elements = [];
        let i = 0;
        for (const part of selector) {
          if (i === 0) {
            elements = await frame.$$(part);
          } else {
            const tmpElements = elements;
            elements = [];
            for (const el of tmpElements) {
              elements.push(...(await el.$$(part)));
            }
          }
          if (elements.length === 0) {
            return [];
          }
          const tmpElements = [];
          for (const el of elements) {
            const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
            if (newEl) {
              tmpElements.push(newEl);
            }
          }
          elements = tmpElements;
          i++;
        }
        return elements;
      }
      const element = await frame.$$(selector);
      if (!element) {
        throw new Error('Could not find element: ' + selector);
      }
      return element;
    }

    async function waitForFunction(fn, timeout) {
      let isActive = true;
      setTimeout(() => {
        isActive = false;
      }, timeout);
      while (isActive) {
        const result = await fn();
        if (result) {
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      throw new Error('Timed out');
    }
    {
        const targetPage = page;
        await targetPage.setViewport({"width":1103,"height":970})
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.goto('http://localhost:3000/stuff/doomguyface/');
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/zeropaper[role=\"link\"]","aria/[role=\"generic\"]"],["#__next > header > div > h1 > a > span"]], targetPage, timeout);
        await element.click({ offset: { x: 114, y: 29.5625} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Hello"],["#__next > header > div > nav > ul > li:nth-child(1) > a"]], targetPage, timeout);
        await element.click({ offset: { x: 23.203125, y: 7.171875} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Blog"],["#__next > header > div > nav > ul > li:nth-child(2) > a"]], targetPage, timeout);
        await element.click({ offset: { x: 5.6875, y: 10.171875} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Toggle the page styling theme"],["#__next > header > div > div > button > svg"]], targetPage, timeout);
        await element.click({ offset: { x: 3.015625, y: 13.171875} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Stuff"],["#__next > header > div > nav > ul > li:nth-child(3) > a"]], targetPage, timeout);
        await element.click({ offset: { x: 29.703125, y: 11.171875} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Toggle the page styling theme"],["#__next > header > div > div > button > svg"]], targetPage, timeout);
        await element.click({ offset: { x: 6.015625, y: 9.171875} });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Visual Fiha"],["#page-content > div > div > div:nth-child(5) > main > section > ul > li:nth-child(2) > a"]], targetPage, timeout);
        await element.click({ offset: { x: 68, y: 12.265625} });
    }

    await browser.close();
})();
