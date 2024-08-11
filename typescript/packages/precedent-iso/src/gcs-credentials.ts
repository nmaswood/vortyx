import { z } from "zod";

export const ZGcsCredentialsObject = z.object({
  type: z.literal("service_account"),
  project_id: z.string(),
  private_key_id: z.string(),
  private_key: z.string(),
  client_email: z.string(),
  client_id: z.string(),
  auth_uri: z.string().url(),
  token_uri: z.string().url(),
  auth_provider_x509_cert_url: z.string().url(),
  client_x509_cert_url: z.string().url(),
  universe_domain: z.string(),
});

export type GcsCredentialsObject = z.infer<typeof ZGcsCredentialsObject>;

export type GcsCredentials = GcsCredentialsObject;
