import InvitationPage from "@/app/[locale]/admin/(dashboard)/(dashboard)/invitation/InvitationPage";

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<unknown>;
}) {
    return <InvitationPage searchParams={searchParams} />;
}
