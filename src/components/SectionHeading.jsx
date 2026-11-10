import ScrollReveal from './ScrollReveal.jsx';
import { OrnamentDivider } from './FloralDecor.jsx';

/**
 * Consistent editorial section heading:
 * handwritten eyebrow → serif title → italic subtitle → floral divider.
 */
export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const isCenter = align === 'center';
  return (
    <ScrollReveal
      className={`relative z-10 mx-auto max-w-3xl ${isCenter ? 'text-center' : 'text-left'}`}
    >
      {eyebrow && (
        <p className="font-script text-3xl text-deeprose sm:text-4xl">{eyebrow}</p>
      )}
      <h2
        className={`mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-5xl ${
          isCenter ? '' : 'lg:text-left'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 font-editorial text-lg italic leading-relaxed text-ink/70 sm:text-xl ${
            isCenter ? 'mx-auto' : ''
          } max-w-2xl`}
        >
          {subtitle}
        </p>
      )}
      <OrnamentDivider className={`mt-6 ${isCenter ? '' : 'justify-start'}`} />
    </ScrollReveal>
  );
}
