import "@testing-library/jest-dom/vitest";
import { beforeAll } from "vitest";

beforeAll(() => {
  // jsdom cannot navigate, and every link click logs an unhandled "Not
  // implemented" error that buries real failures. Tests assert on `href`, so
  // suppressing the navigation itself costs nothing.
  document.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest("a")) {
      event.preventDefault();
    }
  });
});
