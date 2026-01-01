'use client';

import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathRendererProps {
  formula: string;
  block?: boolean;
}

export default function MathRenderer({ formula, block = false }: MathRendererProps) {
  if (block) {
    return <BlockMath math={formula} />;
  }
  return <InlineMath math={formula} />;
}
