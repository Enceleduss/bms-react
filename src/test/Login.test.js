import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Register from "./Register";

// Mock axiosPrivate module
jest.mock("@/api/axios", () => {
  return {
    axiosPrivate: {
      post: jest.fn(),
    },
  };
});

// Mock react-redux useSelector and useDispatch
jest.mock("react-redux", () => {
  return {
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
  };
});

describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component", () => {
    render(<Register />);
    const heading = screen.getByText("Login");
    expect(heading).toBeInTheDocument();
  });

  it("handles form submission successfully", async () => {
    // Mock axiosPrivate.post to return data
    const mockData = {
      user: { username: "testuser", authorities: ["user"] },
      jwt: "testjwt",
    };
    const axiosPrivate = require("@/api/axios").axiosPrivate;
    axiosPrivate.post.mockResolvedValue({ data: mockData });

    // Mock useDispatch to capture the dispatched action
    const useDispatch = require("react-redux").useDispatch;
    const dispatchMock = jest.fn();
    useDispatch.mockReturnValue(dispatchMock);

    render(<Register />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("User Name"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testpassword" },
    });

    fireEvent.click(screen.getByText("Login"));

    // Wait for async actions to complete
    await screen.findByText("User Details");

    // Assertions
    expect(axiosPrivate.post).toHaveBeenCalledWith("/login", {
      email: "testuser",
      password: "testpassword",
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: "auth/setAuthDetails",
      payload: {
        user: "testuser",
        roles: ["user"],
        accessToken: "testjwt",
      },
    });
  });

  it("handles form submission with errors", async () => {
    // Mock axiosPrivate.post to return an error response
    const errorResponse = {
      data: {
        errors: { email: "Email is required" },
      },
    };
    const axiosPrivate = require("@/api/axios").axiosPrivate;
    axiosPrivate.post.mockRejectedValue(errorResponse);

    render(<Register />);

    // Fill out the form
    fireEvent.change(screen.getByPlaceholderText("User Name"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "testpassword" },
    });

    fireEvent.click(screen.getByText("Login"));

    // Wait for error message
    await screen.findByText("Email is required");

    // Assertions
    expect(axiosPrivate.post).toHaveBeenCalledWith("/login", {
      email: "testuser",
      password: "testpassword",
    });
  });
});
