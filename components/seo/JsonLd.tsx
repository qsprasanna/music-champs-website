// components/seo/JsonLd.tsx
// Server component — renders <script type="application/ld+json"> safely.
// Usage: <JsonLd schema={organizationSchema()} />

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: Record<string, any> | Record<string, any>[];
};

export default function JsonLd({ schema }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
