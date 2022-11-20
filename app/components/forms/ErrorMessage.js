import React from 'react';

import { AppText } from '../AppText';

export default function ErrorMessage ({ error, visible }) {
  if (!visible || !error) return null;
  return <AppText style={{ color: 'red' }}>{error}</AppText>;
}
