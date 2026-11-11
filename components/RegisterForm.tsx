"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerPage } from "@/content/copy";

const f = registerPage.form;
/** Posts JSON to NEXT_PUBLIC_REGISTER_ENDPOINT (see docs/kayit-ve-davet-akisi.md); without one, opens a pre-filled e-mail. */
const ENDPOINT = process.env.NEXT_PUBLIC_REGISTER_ENDPOINT;
const FREE = /@(gmail|hotmail|outlook|yahoo|icloud|yandex|protonmail|live|msn)\./i;
type State = "idle" | "sending" | "error";

export function RegisterForm() {
  const id = useId();
  const router = useRouter();
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.website) return;
    const next: Record<string, string> = {};
    for (const k of ["firstName", "lastName", "company", "title"]) if (!data[k]?.trim()) next[k] = f.required;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email || "")) next.email = f.invalidEmail;
    else if (FREE.test(data.email)) next.email = f.freeMail;
    if (!data.consent) next.consent = f.required;
    setErrors(next);
    if (Object.keys(next).length) { form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(); return; }
    setState("sending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...data, source: "tonyai.io/kayit", lang: "tr" }) });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        const body = encodeURIComponent(`${data.firstName} ${data.lastName}\n${data.company} · ${data.title}\n${data.email}`);
        window.location.href = `mailto:hello@tonyai.io?subject=${encodeURIComponent("Kayıt talebi · " + data.company)}&body=${body}`;
      }
      router.push(registerPage.successHref);
    } catch { setState("error"); }
  }

  const field = "h-12 w-full rounded-[var(--radius-sm)] border border-line-2 bg-surface px-3.5 text-[1rem] text-ink";
  const label = "text-[0.9rem] font-[540]";
  const err = (k: string) => errors[k] ? <p id={`${id}-${k}-err`} className="text-[0.8rem] text-miss-fg">{errors[k]}</p> : null;
  const inv = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${id}-${k}-err` : undefined });
  const F = ({ k, type = "text", auto }: { k: "firstName" | "lastName" | "company" | "title" | "email"; type?: string; auto?: string }) => (
    <div className="flex flex-col gap-2">
      <label htmlFor={`${id}-${k}`} className={label}>{f[k]}{k === "email" && <span className="ml-2 font-normal text-ink-3">({f.emailHint})</span>}</label>
      <input id={`${id}-${k}`} name={k} type={type} autoComplete={auto} inputMode={type === "email" ? "email" : undefined} className={field} {...inv(k)} />
      {err(k)}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-8" aria-describedby={`${id}-privacy`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <F k="firstName" auto="given-name" />
        <F k="lastName" auto="family-name" />
        <F k="company" auto="organization" />
        <F k="title" auto="organization-title" />
      </div>
      <F k="email" type="email" auto="email" />
      <div className="hidden" aria-hidden="true"><label htmlFor={`${id}-website`}>Web sitesi</label><input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" /></div>
      <div className="flex flex-col gap-1">
        <label className="flex min-h-11 items-start gap-3 text-[0.9rem] text-ink-2">
          <input type="checkbox" name="consent" className="mt-1 h-5 w-5 shrink-0 accent-[var(--forest)]" {...inv("consent")} />
          <span>{f.consent} <Link href={f.consentLink.href} className="inline-flex min-h-11 items-center underline underline-offset-2">{f.consentLink.label}</Link></span>
        </label>
        {err("consent")}
      </div>
      {state === "error" && <div role="alert" className="rounded-[var(--radius-sm)] bg-miss-bg p-4 text-miss-fg"><strong>{f.error.title}</strong> {f.error.body}</div>}
      <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${id}-privacy`} className="text-[0.85rem] text-ink-3">{f.privacy}</p>
        <button type="submit" className="btn btn-primary" disabled={state === "sending"}>{state === "sending" ? f.sending : f.submit}</button>
      </div>
    </form>
  );
}
