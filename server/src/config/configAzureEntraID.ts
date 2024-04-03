export const config = {
  identityMetadata: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/.well-known/openid-configuration`,
  clientID: process.env.AZURE_CLIENT_ID || "",
  clientSecret: process.env.AZURE_CLIENT_SECRET || "",
  allowMultiAudiencesInToken: false,
  validateIssuer: true,
  passReqToCallback: true,
  loggingLevel: "error" as "error",
  loggingNoPII: false,
  tenantID: process.env.AZURE_TENANT_ID,
  issuer: `https://sts.windows.net/${process.env.AZURE_TENANT_ID}/`,
  audience: `https://${process.env.AZURE_TENANT_ID}.onmicrosoft.com/9fc847b6-92d0-4739-9eb1-6201752d6af1`,
};
