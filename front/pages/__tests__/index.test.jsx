/**
 * @jest-environment jsdom
 */

import singletonRouter, { useRouter } from "next/router";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Index from "../index";
import mockRouter from "next-router-mock";
import NextLink from "next/link";

jest.mock("next/dist/client/router", () => require("next-router-mock"));
jest.mock("react-i18next", () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

describe("Home", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/");
  });

  it("renders a heading", () => {
    render(<Index />);

    const link = screen.getByRole("link", {
      name: /soul/i,
    });

    expect(link).toBeInTheDocument();
  });

  it("works with next/link", () => {
    render(
      <NextLink href="/example?foo=bar">
        <a>Example Link</a>
      </NextLink>
    );
    fireEvent.click(screen.getByText("Example Link"));
    expect(singletonRouter).toMatchObject({ asPath: "/example?foo=bar" });
  });
});
