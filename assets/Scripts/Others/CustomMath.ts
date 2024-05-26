export namespace CustomMath {

    export const EPSILON: number = 0.001;

    export function approximately(a: number, b: number): boolean {
        return Math.abs(a - b) < CustomMath.EPSILON;
    }

    export function clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value));
    }
}
