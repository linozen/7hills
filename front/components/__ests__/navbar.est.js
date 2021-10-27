import React from "react";
import { render } from "@testing-library/react";
import NavBar from "../navbar";

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
describe("NavBar", () => {
  it("renders content", () => {
    render(<NavBar t={(key) => key} />);
    expect(component.container).toHaveText("SOUL");
  });
});
