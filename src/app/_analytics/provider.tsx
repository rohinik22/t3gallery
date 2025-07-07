// app/providers.tsx
'use client'

import { usePathname, useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { usePostHog } from 'posthog-js/react'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useAuth, useUser } from "@clerk/nextjs"

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
 api_host: "/relay-ujCO",
  ui_host: 'https://us.posthog.com',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
      defaults: '2025-05-24',
      capture_pageview: true, // optional

    });
    posthog.capture("test_event", { example: "data" });

    
  }, [])

  return (
    <PHProvider client={posthog}>
        <PostHogAuthWrapper>      {children}
</PostHogAuthWrapper>
    </PHProvider>
  )
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
    const auth = useAuth();
    const userInfo = useUser();
    useEffect(() => {
        if (userInfo.user) {
            posthog.identify(userInfo.user.id, {
                email: userInfo.user.emailAddresses,
            });
        } else if (!auth.isSignedIn) {
           posthog.reset(); 
        }
    }, [auth, userInfo]);
    return children;
}
