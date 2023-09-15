async function googleSignInClicked() {
  try {
    const authUrl = await supertokensThirdParty.getAuthorisationURLWithQueryParamsAndSetState({
      thirdPartyId: "google",
      frontendRedirectURI: "https://navgablog.onrender.com/auth/callback/google",
    });
    window.location.assign(authUrl);
  } catch (err) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert("Oops! Something went wrong.");
    }
  }
}
async function logout() {
  sessionStorage.removeItem('supertokens-oauth-state-2')
  await supertokensSession.signOut();
  window.location.href = "/";
}

async function doesSessionExist() {
  let isUserExisted = await supertokensSession.doesSessionExist();

  if (isUserExisted) {
    return true;
  }

  return false;
}