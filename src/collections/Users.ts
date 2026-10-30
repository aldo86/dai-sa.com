import { APIError, type CollectionConfig } from "payload";
import { administrator } from "../lib/access";

export const Users: CollectionConfig = {
  slug: "users",
  admin: { useAsTitle: "email" },
  auth: { maxLoginAttempts: 5, lockTime: 600_000, tokenExpiration: 7200 },
  access: {
    admin: ({ req }) => Boolean(req.user),
    create: () => false,
    read: administrator,
    update: administrator,
    delete: () => false,
  },
  hooks: {
    beforeChange: [({ operation, req }) => {
      if (operation === "create" && !req.context.provisionAdministrator) {
        throw new APIError("Create the administrator using the local provisioning command.", 403);
      }
    }],
  },
  fields: [],
};