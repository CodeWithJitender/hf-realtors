"use client";

import { Turnstile } from '@marsidev/react-turnstile';

export default function CustomTurnstile({ siteKey, onSuccess }) {
  // Use Cloudflare's official testing keys on localhost to avoid 400 Domain Not Allowed errors
  // 3x...FF forces an interactive challenge (checkbox) locally.
  const activeSiteKey = process.env.NODE_ENV === "development" 
    ? "3x00000000000000000000FF" 
    : siteKey;

  return (
    <div style={{ minHeight: "65px" }} className="w-full flex justify-center">
      <Turnstile 
        siteKey={activeSiteKey} 
        onSuccess={(token) => {
          if (onSuccess) onSuccess(token);
        }}
        options={{ 
          theme: 'dark',
          appearance: 'always' // Forces the checkbox to be visible instead of invisible
        }}
      />
    </div>
  );
}
