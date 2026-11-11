"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { contactPage } from "@/content/copy";

const f = contactPage.form;
/** Posts JSON to NEXT_PUBLIC_FORM_ENDPOINT; without one, opens the visitor's mail program pre-filled. */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
type State = "idle" | "sending" | "sent" | "error";

/** `variant="demo"` presets the topic, hides the topic field and redirects to `successHref` once sent. */
export function ContactForm({ variant = "contact", successHref }: { variant?: "contact" | "demo"; successHref?: string } = {}) {
  const id = useId();
  const router = useRouter();
  const isDemo = variant === "demo";
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    if (data.website) return;
    const next: Record<string, string> = {};
    if (!data.name?.trim()) next.name = f.required;
    if (!data.company?.trim()) next.company = f.required;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email || "")) next.email = f.invalidEmail;
    if (!data.consent) next.consent = f.required;
    setErrors(next);
    if (Object.keys(next).length) { form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus(); return; }
    setState("sending");
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ ...data, page: window.location.pathname, lang: "tr" }) });
        if (!res.ok) throw new Error(String(res.status));
      } else {
        const subject = encodeURIComponent(`${data.topic} · ${data.company}`);
        const body = encodeURIComponent(`${data.name}\n${data.company}\n${data.email}\n${data.phone || ""}\n${f.size}: ${data.size}\n\n${data.message || ""}`);
        window.location.href = `mailto:${contactPage.panel.email}?subject=${subject}&body=${body}`;
      }
      setState("sent");
      if (isDemo && successHref) router.push(successHref);
    } catch { setState("error"); }
  }

  const field = "h-12 w-full rounded-[var(--radius-sm)] border border-line-2 bg-surface px-3.5 text-[1rem] text-ink";
  const label = "text-[0.9rem] font-[540]";
  const err = (k: string) => errors[k] ? <p id={`${id}-${k}-err`} className="text-[0.8rem] text-miss-fg">{errors[k]}</p> : null;
  const inv = (k: string) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${id}-${k}-err` : undefined });

  if (state === "sent") {
    return (
      <div role="status" className="flex min-h-[20rem] flex-col items-start justify-center gap-3 rounded-[var(--radius-lg)] border border-line bg-surface p-8">
        <h2 className="h3">{f.success.title}</h2><p className="text-ink-2">{f.success.body}</p>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 rounded-[var(--radius-lg)] border border-line bg-surface p-6 sm:p-8" aria-describedby={`${id}-privacy`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2"><label htmlFor={`${id}-name`} className={label}>{f.name}</label><input id={`${id}-name`} name="name" type="text" autoComplete="name" className={field} {...inv("name")} />{err("name")}</div>
        <div className="flex flex-col gap-2"><label htmlFor={`${id}-company`} className={label}>{f.company}</label><input id={`${id}-company`} name="company" type="text" autoComplete="organization" className={field} {...inv("company")} />{err("company")}</div>
        <div className="flex flex-col gap-2"><label htmlFor={`${id}-email`} className={label}>{f.email}</label><input id={`${id}-email`} name="email" type="email" autoComplete="email" inputMode="email" className={field} {...inv("email")} />{err("email")}</div>
        <div className="flex flex-col gap-2"><label htmlFor={`${id}-phone`} className={label}>{f.phone} <span className="font-normal text-ink-3">({f.phoneHint})</span></label><input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel" className={field} /></div>
        {isDemo ? (
          <input type="hidden" name="topic" value={f.topics[0]} />
        ) : (
          <div className="flex flex-col gap-2"><label htmlFor={`${id}-topic`} className={label}>{f.topic}</label>
            <select id={`${id}-topic`} name="topic" defaultValue={f.topics[0]} className={`${field} border-forest bg-forest-tint`}>{f.topics.map((t) => <option key={t}>{t}</option>)}</select></div>
        )}
        <div className="flex flex-col gap-2"><label htmlFor={`${id}-size`} className={label}>{f.size}</label>
          <select id={`${id}-size`} name="size" defaultValue={f.sizes[0]} className={field}>{f.sizes.map((t) => <option key={t}>{t}</option>)}</select></div>
      </div>
      <div className="flex flex-col gap-2"><label htmlFor={`${id}-message`} className={label}>{f.message}</label><textarea id={`${id}-message`} name="message" rows={5} className="w-full rounded-[var(--radius-sm)] border border-line-2 bg-surface px-3.5 py-3 text-[1rem] text-ink" /></div>
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
        <button type="submit" className="btn btn-primary" disabled={state === "sending"} data-magnetic>{state === "sending" ? f.sending : isDemo ? f.submitDemo : f.submit}</button>
      </div>
    </form>
  );
}
