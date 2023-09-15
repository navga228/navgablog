import ThirdParty from 'supertokens-node/recipe/thirdparty';
import Session from 'supertokens-node/recipe/session';

export const appInfo = {
  appName: 'navgaBlog',
  apiDomain: 'https://navgablog.onrender.com/',
  websiteDomain: 'https://navgablog.onrender.com/',
  apiBasePath: '/auth',
  websiteBasePath: '/auth',
};

export const connectionUri =
  'https://st-prod-d0ac2780-5301-11ee-a7f0-096a527e3d58.aws.supertokens.io';
export const apiKey = 'v78SnAV=eN6O9Y5f7eMHwV8yHc';

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
