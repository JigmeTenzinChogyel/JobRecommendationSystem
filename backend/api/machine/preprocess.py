import re

def preprocess_text(text):

    # Remove non-ASCII characters
    text = ''.join([c for c in text if ord(c) < 128])

    # Remove wide spaces
    text = re.sub(r'\s+', ' ', text)

    # Remove newline characters
    text = text.replace('\n', ' ')

    return text