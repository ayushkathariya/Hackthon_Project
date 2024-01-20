"use client";

import { useSession } from "next-auth/react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function Page({ params }: { params: { id: string } }) {
  const { data } = useSession();

  const myMeeting = async (element: any) => {
    const appId = 288370170;
    const serverSecret = "0a5ae6ea8ddde5f691e8ef8524fdd9c9";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      params.id as string,
      Date.now().toString() as any,
      data?.user?.name || "Random User"
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken);
    zc.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.OneONoneCall,
      },
      showScreenSharingButton: true,
      sharedLinks: [
        {
          name: "Copy Link",
          url: `${process.env.NEXT_PUBLIC_BASE_URL}/room/${params?.id}`,
        },
      ],
    });
  };

  return (
    <div>
      <div className="h-[94vh]" ref={myMeeting}></div>
    </div>
  );
}
