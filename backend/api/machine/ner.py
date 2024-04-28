import spacy
import os

def process(text):
    
    nlp = spacy.load(os.getenv("MODEL_PATH"))
    doc = nlp(text)
    skills, experience, qualifications = [], [], []

    for ent in doc.ents:
        if ent.label_ == "SKILL ":
            skills.append(ent.text)
        elif ent.label_ == "QUALIFICATION":
            qualifications.append(ent.text)
        else:
            experience.append(ent.text)

    return skills, experience, qualifications