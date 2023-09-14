import ThirdParty from 'supertokens-node/recipe/thirdparty';
import Session from 'supertokens-node/recipe/session';

export const appInfo = {
  appName: 'navgaBlog',
  apiDomain: 'http://127.0.0.1:3000/',
  websiteDomain: 'http://127.0.0.1:3000/',
  apiBasePath: '/auth',
  websiteBasePath: '/auth',
};

export const connectionUri =
  'https://st-dev-ca2ca420-5301-11ee-a7f0-096a527e3d58.aws.supertokens.io';
export const apiKey = 'i4MKWSw=zm-h0wtZnFj7sgyXz7';

export const recipeList = [
  ThirdParty.init({
    signInAndUpFeature: {
      providers: [{
        config: {
          thirdPartyId: "google",
          clients: [{
            clientId: "551013448947-1ca0ap8csi779272g2s06nec5r8tlc6m.apps.googleusercontent.com",
            clientSecret: "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S"
          }]
        }
      }],
    }
  }),
  Session.init(),
];
