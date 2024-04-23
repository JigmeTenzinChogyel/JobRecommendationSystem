import spacy


def process(text):
    
    nlp = spacy.load("C:/Users/kinle/Documents/Git Hub/JobRecommendationSystem/backend/model-best")
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