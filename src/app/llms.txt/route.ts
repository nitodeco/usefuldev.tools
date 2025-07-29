import dedent from 'dedent';

export async function GET() {
  const content = dedent`
    # About Useful Dev Tools
    
    Useful Dev Tools is a comprehensive web application that provides a collection of client-side developer utilities.

    ## Website Information

    - **URL**: https://usefuldev.tools
    - **Repository**: https://github.com/nitodeco/usefuldev.tools
    - **Author**: Nico Möhn (nitodeco)
    - **License**: MIT
    - **Description**: A set of useful, client-side tools for developers

    ## Available Tools

    The application currently offers 7 main developer tools organized into 4 categories:

    ### Generators
    - **UUID Generator** (/uuid): Generate UUIDs (Universally Unique Identifiers) in different versions including Version 1 (Time-based), Version 4 (Random), Version 6 (Reordered time), and Version 7 (Unix timestamp)

    ### Testing
    - **Regex Tester** (/regex): Validate and test regular expressions with real-time feedback, including pattern validation, test string matching, and character analysis

    ### Cryptography
    - **Hash Generator** (/hash): Generate cryptographic hashes using various algorithms including MD5, SHA-256, SHA-512, bcrypt, and xxHash

    ### Converters
    - **Base64 Converter** (/base64): Encode and decode Base64 strings with support for text input and file uploads
    - **CSV/JSON Converter** (/csv): Convert between CSV and JSON formats with parsing and formatting capabilities
    - **Markdown Converter** (/markdown): Convert Markdown to HTML with live preview functionality
    - **URL Encoder/Decoder** (/url-encoder): Encode and decode URLs with support for various encoding types

    ## Key Features

    ### User Experience
    - **Client-Side Processing**: All operations performed locally for privacy and speed
    - **Dark/Light Theme**: Toggle between themes with system preference detection
    - **Responsive Design**: Optimized for desktop, tablet, and mobile devices
    - **Search Functionality**: Filter and search through available tools
    - **Copy to Clipboard**: One-click copying of generated results
    - **File Upload Support**: Drag-and-drop file handling for relevant tools

    ### Developer Features
    - **Real-Time Validation**: Immediate feedback for regex patterns and input validation
    - **Multiple Output Formats**: Support for various encoding and conversion formats
    - **Error Handling**: Comprehensive error states and user feedback

    ### Privacy and Security
    - **No Server Processing**: All computations happen client-side
    - **No Data Storage**: No user data is stored or transmitted
    - **HTTPS**: Secure connection for all interactions
    - **Content Security Policy**: Protection against XSS attacks

    This application serves as a comprehensive toolkit for developers, providing essential utilities in a privacy-focused, performant, and user-friendly interface.`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
