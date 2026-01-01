
import React from 'react';
import MathRenderer from '@/components/domain/MathRenderer';

export default function Page() {
  return (
    <div className="p-10 font-sans">
      <h1 className="text-2xl font-bold">Math Capabilities Test</h1>
      
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Inline</h2>
        <p>
          The energy-mass equivalence is described by <MathRenderer formula="E = mc^2" />.
        </p>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Block</h2>
        <MathRenderer formula="\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}" block />
      </div>
    </div>
  );
}
