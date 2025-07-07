// scripts/rate-limit-test.ts

import { ratelimit } from "~/server/ratelimit";

async function testRatelimit() {
  try {
    const { success, remaining, reset } = await ratelimit.limit("test_user");

    console.log("✅ Rate limit result:");
    console.log("Success:", success);
    console.log("Remaining:", remaining);
    console.log("Resets in:", reset);
  } catch (err) {
    console.error("❌ Ratelimit test failed:", err);
  }
}

testRatelimit();
