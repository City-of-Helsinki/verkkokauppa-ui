/**
 * A function to derive an error string from an array of errors.
 */
export const deriveErrorMessage = errors => {
    const errorCollection = [];
    for (const error of errors) {
        if (error) {
            errorCollection.push(toString(error));
        }
    }

    return errorCollection.join(', ');
};