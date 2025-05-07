// unit.test.js
import {
  isPhoneNumber,
  isEmail,
  isStrongPassword,
  isDate,
  isHexColor,
} from '../code-to-unit-test/unit-test-me';

// Tests for isPhoneNumber function
test('test phone number, parenthesis area code', () => {
  expect(isPhoneNumber('(123) 456-7890')).toBe(true);
});

test('test phone number, hyphen area code', () => {
  expect(isPhoneNumber('123-456-7890')).toBe(true);
});

test('test phone number, include letters', () => {
  expect(isPhoneNumber('(123) abc-7890')).toBe(false);
});

test('test phone number, period format, should fail', () => {
  expect(isPhoneNumber('123.456.7890')).toBe(false);
});

// Tests for isEmail function
test('test simple email address', () => {
  expect(isEmail('user@domain.com')).toBe(true);
});

test('test email with underscore', () => {
  expect(isEmail('user_name@domain.org')).toBe(true);
});

test('test email without domain', () => {
  expect(isEmail('user@')).toBe(false);
});

test('test email with special character (+)', () => {
  expect(isEmail('user+name@domain.com')).toBe(false);
});

// Tests for isStrongPassword function
test('test password starting with letter and containing numbers', () => {
  expect(isStrongPassword('a123')).toBe(true);
});

test('test valid password with underscore', () => {
  expect(isStrongPassword('pass_word123')).toBe(true);
});

test('test invalid password - starts with number', () => {
  expect(isStrongPassword('1password')).toBe(false);
});

test('test invalid password - contains @', () => {
  expect(isStrongPassword('pass@word')).toBe(false);
});

// Tests for isDate function
test('test x/y/zzzz format', () => {
  expect(isDate('1/1/2023')).toBe(true);
});

test('test xx/yy/zzzz format', () => {
  expect(isDate('12/31/2023')).toBe(true);
});

test('test with dashes - should reject ', () => {
  expect(isDate('12-31-2023')).toBe(false);
});

test('test with 2 digit year - should reject', () => {
  expect(isDate('12/31/23')).toBe(false);
});

// Tests for isHexColor function
test('test 3 character hex - no hash', () => {
  expect(isHexColor('abc')).toBe(true);
});

test('test 3 character hex - hash', () => {
  expect(isHexColor('#123456')).toBe(true);
});

test('test with non hexa character - should reject', () => {
  expect(isHexColor('#12345G')).toBe(false);
});

test('test non 3/6 character - should reject', () => {
  expect(isHexColor('#12345')).toBe(false);
});