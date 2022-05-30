import {ComponentType} from "react";

export function withContainedVariant<T>(Component: ComponentType<T>) {
  return (props: T) => <Component {...props} variant="contained"/>
}