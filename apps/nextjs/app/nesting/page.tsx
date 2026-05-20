import { PatternFive } from "./PatternFive";
import { PatternFour } from "./PatternFour";
import { PatternOne } from "./PatternOne";
import { PatternThree } from "./PatternThree";
import { PatternTwo } from "./PatternTwo";

const PATTERNS = [
  {
    emoji: "✅",
    title: "Server renders Client",
    rule: "Server Component kan importere og rendre Client Components.",
    component: <PatternOne />,
  },
  {
    emoji: "❌",
    title: "Client importerer Server",
    rule: "Client Component kan IKKE importere en Server Component. Alt en 'use client'-fil importerer blir klientkode.",
    component: <PatternTwo />,
  },
  {
    emoji: "✅",
    title: "Composition via children",
    rule: "Client Component kan motta Server Components som children. Det er Page (server) som importerer — Client'en vet ikke hva children er.",
    component: <PatternThree />,
  },
  {
    emoji: "✅",
    title: "Composition via named props",
    rule: "Same prinsipp som children, men med flere named slots (header, sidebar, content). Page komponerer — Client renderer blindt.",
    component: <PatternFour />,
  },
  {
    emoji: "❌",
    title: "Client sender props til Server Component",
    rule: "Client Component kan ikke sende nye props til en Server Component ved runtime. Server Components er allerede rendret — de finnes ikke i nettleseren.",
    component: <PatternFive />,
  },
];

export default function NestingPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-10">
        <h1
          className="text-3xl font-bold mb-2"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.03em",
          }}
        >
          Server / Client Nesting
        </h1>
      </div>

      <div className="flex flex-col gap-10">
        {PATTERNS.map((pattern, i) => (
          <section key={i}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{pattern.emoji}</span>
              <h2
                className="text-lg font-semibold"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {i + 1}. {pattern.title}
              </h2>
            </div>
            <p className="text-sm mb-4">{pattern.rule}</p>
            {pattern.component}
          </section>
        ))}
      </div>
    </div>
  );
}
