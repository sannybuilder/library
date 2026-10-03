The hashing algorithm used here is called JAMCRC - a variation of the standard CRC32 algorithm where bits of the final result are not inverted. Read more here: https://gtamods.com/wiki/Cryptography#CRC32

The input string is automatically converted to uppercase. Hashing processes up to 15 characters, stopping at first null byte.
