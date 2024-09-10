import Link from "next/link";
import Layout from "@/components/dashboardLayout"

export default function Dashboard() {
  return (
    <Layout >
      <Link href="/dashboard/create-list">Create List</Link>
      <Link href="/dashboard/lists">Lists</Link>
    </Layout>
  );
}
