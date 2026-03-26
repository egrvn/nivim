import { Fragment } from "react";

export function renderLines(value: string) {
  return value.split("\n").map((line, index) => (
    <Fragment key={`${line}-${index}`}>
      {index > 0 ? <br /> : null}
      {line}
    </Fragment>
  ));
}
