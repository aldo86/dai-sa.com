import type { Access } from "payload";

export const administrator: Access = ({ req }) => Boolean(req.user);

export const publishedOnly: Access = ({ req }) =>
  req.user ? true : { _status: { equals: "published" } };