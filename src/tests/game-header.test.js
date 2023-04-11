import React from "react";
import { render, screen } from "@testing-library/react";
import GameHeader from "../components/GameHeader";

describe("GameHeader", () => {
  test("renders the remaining time", () => {
    render(<GameHeader />);
    const remainingTime = screen.getByText(/time left/i);
    expect(remainingTime).toBeInTheDocument();
  });

  test("renders the restart button", () => {
    render(<GameHeader />);
    const restartButton = screen.getByText(/restart/i);
    expect(restartButton).toBeInTheDocument();
  });
});
