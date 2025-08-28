/**
 * ==========================
 *  @CN
 *  @DESCRIPTION: This file contains utility functions and types for the application.
 *  @VERSION 1.0.0
 * ==========================
 */

export * from './helpers/auth.helper';
export * from './helpers/heading.helper';
export * from './helpers/jwt.helper';
export * from './helpers/query.helper';
export * from './helpers/share.helper';
export * from './helpers/truncate_text.helper';
export * from './helpers/utils';

/**
 * ==========================
 *  @FORMATER
 *  @DESCRIPTION : This file contains utility functions for formatting data, such as dates.
 *  @VERSION 1.0.0
 * ==========================
 */

export * from './formatters/format_time.utils';

/**
 * ==========================
 *  @VALIDATORS
 *  @DESCRIPTION : This file contains utility functions for validating data, such as email and password.
 *  @VERSION 1.0.0
 * ==========================
 */
export * from './validators/client.validator';
export * from './validators/email.validator';
export * from './validators/empty.validator';
export * from './validators/form.validator';
export * from './validators/passsword.validator';

/**
 * ==========================
 *  @LOGERS
 *  @DESCRIPTION :This file contains utility functions for logging data, such as console logs.
 *  @VERSION 1.0.0
 * ==========================
 */

export * from './logger';
export * from './token.utils';
