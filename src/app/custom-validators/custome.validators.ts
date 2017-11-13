import { FormGroup } from '@angular/forms';

export function equalValidator({ value }: FormGroup): {} {
  const [first, ...rest] = Object.keys(value || {});
  const valid = rest.every(v => value[v] === value[first]);
  return valid ? null : { equal: true };
}
