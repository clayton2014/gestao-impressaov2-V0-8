"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { SettingsDAO } from "@/lib/dao";

interface Settings {
  company_name?: string;
  company_logo_url?: string;
}

export default function AuthShell({ children }: { children: React.ReactNode }) {
  const [logoError, setLogoError] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    company_name: "GraphPrint",
    company_logo_url: "/logo.svg"
  });

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await SettingsDAO.get();
        if (data) {
          setSettings({
            company_name: data.company_name || "GraphPrint",
            company_logo_url: data.company_logo_url || "/logo.svg"
          });
        }
      } catch (error) {
        // Se não conseguir carregar, usa os padrões
        console.log("Using default settings");
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = `${settings.company_name} — Entrar`;
    }
  }, [settings.company_name]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#6a00ff] via-[#8e2de2] to-[#4a00e0]">
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center text-white">
            <div className="mx-auto mb-3 h-14 w-14 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center ring-1 ring-white/25">
              {!logoError ? (
  <Image src={(settings?.logo_url as string) || "/assets/logos/logo-1.svg"} alt={settings?.company_name || "Logo"} width={64} height={64} className="h-8 w-8 object-contain" onError={() => setLogoError(true)} priority />
) : (
  <span className="fallback-text inline-flex h-8 w-8 items-center justify-center rounded bg-white/20 text-white text-sm font-semibold">
    {(settings?.company_name || "GD").slice(0,2).toUpperCase()}
  </span>
)}
            </div>
            <h1 className="text-2xl font-semibold tracking-tight drop-shadow-sm">{settings.company_name}</h1>
            <p className="text-white/85 mt-1">Acesse sua conta para continuar</p>
          </div>

          <div className="rounded-2xl bg-white/95 shadow-2xl ring-1 ring-black/5 backdrop-blur p-6">
            {children}
          </div>

          <div className="mt-6 text-center text-white/80 text-xs">
            © {new Date().getFullYear()} {settings.company_name}. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </div>
  );
}