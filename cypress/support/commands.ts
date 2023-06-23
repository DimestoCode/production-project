/// <reference types="cypress" />
import { removeArticle, createArticle } from "./commands/article";
import { addComment } from "./commands/comment";
import { getByTestId } from "./commands/getByTestId";
import { login } from "./commands/login";
import { resetProfile, updateProfile } from "./commands/profile";
import { setRate } from "./commands/rating";

Cypress.Commands.addAll({
    login,
    getByTestId,
    updateProfile,
    resetProfile,
    createArticle,
    removeArticle,
    addComment,
    setRate
});
