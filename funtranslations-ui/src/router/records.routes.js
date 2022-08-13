import { Layout, List } from "@/views/records";

export default {
  path: "/records",
  component: Layout,
  children: [{ path: "", component: List }],
};
