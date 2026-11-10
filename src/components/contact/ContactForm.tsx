import { useEffect, useId, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { ContactSelect } from '@/components/contact/ContactSelect'
import { ContactSuccess } from '@/components/contact/ContactSuccess'
import { Button } from '@/components/ui/button'
import {
  contactCopy,
  contactFieldLabels,
  contactPlaceholders,
} from '@/content/contact'
import {
  serviceOptions,
  stateOptions,
  urgencyOptions,
} from '@/content/form-options'
import { submitContact } from '@/data/contact/submitContact'
import { trackLead } from '@/lib/analytics'
import {
  contactFormSchema,
  type ContactFormValues,
} from '@/lib/contact-schema'
import { cn } from '@/lib/utils'
import type { ContactPayload } from '@/types/contact'

type FieldErrorProps = {
  id: string
  message?: string
}

function FieldError({ id, message }: FieldErrorProps) {
  if (!message) return null
  return (
    <span id={id} role="alert" className="text-[13px] font-normal text-[#B91C1C]">
      {message}
    </span>
  )
}

const emptyValues: ContactFormValues = {
  fullName: '',
  company: '',
  email: '',
  phone: '',
  activity: '',
  service: '',
  urgency: '',
  state: '',
  message: '',
  privacyAccepted: false,
  website: '',
}

function parseUrlDefaults(searchParams: URLSearchParams) {
  const servicio = searchParams.get('servicio') ?? ''
  const actividad = searchParams.get('actividad') ?? ''
  const service = serviceOptions.some((o) => o.value === servicio)
    ? servicio
    : ''
  const trimmed = actividad.trim()
  const activity =
    trimmed.length >= 2 && trimmed.length <= 160 ? trimmed : ''
  return { service, activity }
}

export function ContactForm() {
  const formId = useId()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [sent, setSent] = useState(false)

  // Primitivos estables: evitar resetear el form en cada render por nueva ref de searchParams.
  const servicioParam = searchParams.get('servicio') ?? ''
  const actividadParam = searchParams.get('actividad') ?? ''
  const urlService = serviceOptions.some((o) => o.value === servicioParam)
    ? servicioParam
    : ''
  const trimmedActivity = actividadParam.trim()
  const urlActivity =
    trimmedActivity.length >= 2 && trimmedActivity.length <= 160
      ? trimmedActivity
      : ''

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: {
      ...emptyValues,
      ...parseUrlDefaults(searchParams),
    },
  })

  const messageValue = watch('message') ?? ''
  const messageLen = messageValue.length

  useEffect(() => {
    if (sent) return
    if (urlService) setValue('service', urlService)
    if (urlActivity) setValue('activity', urlActivity)
  }, [urlService, urlActivity, setValue, sent])

  const onInvalid = () => {
    const order: Array<keyof ContactFormValues> = [
      'fullName',
      'company',
      'email',
      'phone',
      'activity',
      'service',
      'urgency',
      'state',
      'message',
      'privacyAccepted',
    ]
    const first = order.find((name) => errors[name])
    if (!first) return
    setFocus(first)
    document
      .getElementById(`${formId}-${first}`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const onSubmit = handleSubmit(async (values) => {
    const payload: ContactPayload = {
      fullName: values.fullName.trim(),
      company: values.company.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      activity: values.activity.trim(),
      service: values.service,
      urgency: values.urgency,
      state: values.state,
      message: (values.message ?? '').trim(),
      privacyAccepted: true,
      website: values.website ?? '',
      sourcePath: `${location.pathname}${location.search}`,
    }

    const result = await submitContact(payload)
    if (!result.ok) {
      toast.error(
        result.error === 'rate_limited'
          ? contactCopy.rateLimitedToast
          : contactCopy.errorToast,
      )
      return
    }

    trackLead({ service: payload.service, urgency: payload.urgency })
    setSent(true)
  }, onInvalid)

  if (sent) {
    return (
      <ContactSuccess
        onReset={() => {
          setSent(false)
          reset({
            ...emptyValues,
            service: urlService,
            activity: urlActivity,
          })
        }}
      />
    )
  }

  const disabled = isSubmitting

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      className="relative grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[22px]"
    >
      <label className="fld" htmlFor={`${formId}-fullName`}>
        {contactFieldLabels.fullName}
        <input
          id={`${formId}-fullName`}
          className="inp"
          type="text"
          autoComplete="name"
          disabled={disabled}
          aria-invalid={errors.fullName ? true : undefined}
          aria-describedby={
            errors.fullName ? `${formId}-fullName-error` : undefined
          }
          {...register('fullName')}
        />
        <FieldError
          id={`${formId}-fullName-error`}
          message={errors.fullName?.message}
        />
      </label>

      <label className="fld" htmlFor={`${formId}-company`}>
        {contactFieldLabels.company}
        <input
          id={`${formId}-company`}
          className="inp"
          type="text"
          autoComplete="organization"
          disabled={disabled}
          aria-invalid={errors.company ? true : undefined}
          aria-describedby={
            errors.company ? `${formId}-company-error` : undefined
          }
          {...register('company')}
        />
        <FieldError
          id={`${formId}-company-error`}
          message={errors.company?.message}
        />
      </label>

      <label className="fld" htmlFor={`${formId}-email`}>
        {contactFieldLabels.email}
        <input
          id={`${formId}-email`}
          className="inp"
          type="email"
          autoComplete="email"
          disabled={disabled}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={
            errors.email ? `${formId}-email-error` : undefined
          }
          {...register('email')}
        />
        <FieldError
          id={`${formId}-email-error`}
          message={errors.email?.message}
        />
      </label>

      <label className="fld" htmlFor={`${formId}-phone`}>
        {contactFieldLabels.phone}
        <input
          id={`${formId}-phone`}
          className="inp"
          type="tel"
          autoComplete="tel"
          disabled={disabled}
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={
            errors.phone ? `${formId}-phone-error` : undefined
          }
          {...register('phone')}
        />
        <FieldError
          id={`${formId}-phone-error`}
          message={errors.phone?.message}
        />
      </label>

      <label className="fld" htmlFor={`${formId}-activity`}>
        {contactFieldLabels.activity}
        <input
          id={`${formId}-activity`}
          className="inp"
          type="text"
          disabled={disabled}
          aria-invalid={errors.activity ? true : undefined}
          aria-describedby={
            errors.activity ? `${formId}-activity-error` : undefined
          }
          {...register('activity')}
        />
        <FieldError
          id={`${formId}-activity-error`}
          message={errors.activity?.message}
        />
      </label>

      {/* DECISIÓN: Radix Select en lugar de <select> nativo — el menú nativo no abre en el preview embebido de Cursor/Electron. */}
      <div className="fld">
        <span id={`${formId}-service-label`}>{contactFieldLabels.service}</span>
        <Controller
          name="service"
          control={control}
          render={({ field }) => (
            <ContactSelect
              id={`${formId}-service`}
              ref={field.ref}
              value={field.value}
              placeholder={contactPlaceholders.service}
              options={serviceOptions}
              disabled={disabled}
              invalid={Boolean(errors.service)}
              labelledBy={`${formId}-service-label`}
              describedBy={
                errors.service ? `${formId}-service-error` : undefined
              }
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        <FieldError
          id={`${formId}-service-error`}
          message={errors.service?.message}
        />
      </div>

      <div className="fld">
        <span id={`${formId}-urgency-label`}>
          {contactFieldLabels.urgency}
        </span>
        <Controller
          name="urgency"
          control={control}
          render={({ field }) => (
            <ContactSelect
              id={`${formId}-urgency`}
              ref={field.ref}
              value={field.value}
              placeholder={contactPlaceholders.urgency}
              options={urgencyOptions}
              disabled={disabled}
              invalid={Boolean(errors.urgency)}
              labelledBy={`${formId}-urgency-label`}
              describedBy={
                errors.urgency ? `${formId}-urgency-error` : undefined
              }
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        <FieldError
          id={`${formId}-urgency-error`}
          message={errors.urgency?.message}
        />
      </div>

      <div className="fld">
        <span id={`${formId}-state-label`}>{contactFieldLabels.state}</span>
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <ContactSelect
              id={`${formId}-state`}
              ref={field.ref}
              value={field.value}
              placeholder={contactPlaceholders.state}
              options={stateOptions}
              disabled={disabled}
              invalid={Boolean(errors.state)}
              labelledBy={`${formId}-state-label`}
              describedBy={
                errors.state ? `${formId}-state-error` : undefined
              }
              onChange={field.onChange}
              onBlur={field.onBlur}
            />
          )}
        />
        <FieldError
          id={`${formId}-state-error`}
          message={errors.state?.message}
        />
      </div>

      <label className="fld col-span-full" htmlFor={`${formId}-message`}>
        <span className="flex items-baseline justify-between gap-3">
          <span>{contactFieldLabels.message}</span>
          <span className="font-normal text-muted">{messageLen}/2000</span>
        </span>
        <textarea
          id={`${formId}-message`}
          className="inp"
          rows={5}
          placeholder={contactCopy.messagePlaceholder}
          disabled={disabled}
          maxLength={2000}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? `${formId}-message-error` : undefined
          }
          {...register('message')}
        />
        <FieldError
          id={`${formId}-message-error`}
          message={errors.message?.message}
        />
      </label>

      <div className="hp-field" aria-hidden="true">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          id={`${formId}-website`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('website')}
        />
      </div>

      <div className="col-span-full flex flex-col gap-4">
        <Controller
          name="privacyAccepted"
          control={control}
          render={({ field }) => (
            <label
              className="flex items-start gap-3 text-sm font-normal text-ink"
              htmlFor={`${formId}-privacyAccepted`}
            >
              <input
                id={`${formId}-privacyAccepted`}
                ref={field.ref}
                type="checkbox"
                disabled={disabled}
                checked={field.value}
                onBlur={field.onBlur}
                onChange={(event) => field.onChange(event.target.checked)}
                className="mt-0.5 size-5 shrink-0 accent-navy"
                aria-invalid={errors.privacyAccepted ? true : undefined}
                aria-describedby={
                  errors.privacyAccepted
                    ? `${formId}-privacyAccepted-error`
                    : undefined
                }
              />
              <span>
                {contactCopy.privacyLabelBefore}
                <Link
                  to="/aviso-de-privacidad"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold"
                >
                  {contactCopy.privacyLinkLabel}
                </Link>
                {contactCopy.privacyLabelAfter}
              </span>
            </label>
          )}
        />
        <FieldError
          id={`${formId}-privacyAccepted-error`}
          message={errors.privacyAccepted?.message}
        />

        <div className="border-t border-line pt-4 text-[13px] text-muted">
          {contactCopy.disclaimer}
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            disabled={disabled}
            className={cn('min-h-14 px-9')}
          >
            {disabled ? (
              <>
                <LoaderCircle
                  aria-hidden="true"
                  className="size-4 animate-spin motion-reduce:animate-none"
                />
                {contactCopy.submittingLabel}
              </>
            ) : (
              contactCopy.submitLabel
            )}
          </Button>
        </div>
      </div>
    </form>
  )
}
