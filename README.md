# Rulet

***Rulet*** is a library to think differently when we need to create settings for our applications. It is based on ```rules``` and ```tags``` that will help us to combine sets of objects.

## Let's start with an example

### The problem

Suppose that we have different environments, different apps, different scenarios. Our matrix combination of rules should have 3 dimensions and we need to define settings for all of them:

```javascript
let settings = {
    qa: {
        firstApp: {
            loginRight: {
                username: "Right", password: "right"
            },
            loginWrong: {
                username: "Wrong", password: "wrong"
            }
        },
        secondApp: {
            loginRight: {
                username: "RightForSecondApp", password: "right"
            },
            loginWrong: {
                username: "Wrong", password: "wrong"
            }
        }
    },
    prod: {
        firstApp: {
            loginRight: {
                username: "Right", password: "right"
            },
            loginWrong: {
                username: "Wrong", password: "wrong"
            }
        },
        secondApp: {
            loginRight: {
                username: "RightsForSecondAppInProd", password: "right"
            },
            loginWrong: {
                username: "Wrong", password: "wrong"
            }
        }
    }
}
```

Another alternative could be the use of a ```common``` attribute, and reuse it in some cases. But, what happens when we need different ```commons``` in different situations? We end up in the same approach.

### The solution

With ```Rulet``` we organize the settings based on ```rules``` and ```tags```.

- ```rules``` are JS conditions on the first level of an object. You can create any kind of condition using ```tags```. E.g:

  ```javascript
  let settings = {
      // Rule 1
      "(myTag1 || myTag2) && myTag3": { mySetting: 123 },

      // Rule 2
      "myTag3": { myAnotherSetting: 456 }
  };

- ```tags``` are use to fetch the desired information. ***Rulet*** will apply all ```rules``` from top to bottom, combining them.

    ```javascript

    let tags = ['myTag3', 'myTag1'];

    let rulet = new Rulet(settings, tags);
    let outConfiguration = rulet.getConfiguration();

    console.log(outConfiguration); /* Will print: { mySetting: 123, myAnotherSetting: 456 } */
    ```

A real example:

```javascript

var Rulet = require('rulet');

let settings = {
    "qa || prod": {
        loginWrong: {
            username: "Wrong", password: "wrong"
        }
    },
    "(qa || prod) && firstApp": {
        loginRight: {
            username: "Right", password: "right"
        }
    },
    "qa && secondApp": {
        loginRight: {
            username: "RightForSecondApp", password: "right"
        }
    },
    "prod && secondApp": {
        loginRight: {
            username: "RightsForSecondAppInProd", password: "right"
        }
    }
};

let tags = ['qa', 'secondApp'];

let rulet = new Rulet(settings, tags);
let outConfiguration = rulet.getConfiguration();

console.log(outConfiguration);
/* Will print:
    {
        loginRight: { username: "RightForSecondApp", password: "right" },
        loginWrong: { username: "Wrong", password: "wrong" }
    }
*/

```

***Author***: Miguel Ángel Domínguez Coloma <m@eridem.net> (<http://eridem.net>)