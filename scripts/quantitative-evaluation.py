from nltk.translate.bleu_score import SmoothingFunction, corpus_bleu
from rouge_score import rouge_scorer
import json

eval_qs_filename = "./../team-answers/evaluation-questions.json"
team_qs_filename = "./../team-answers/<TEAM-NAME>.json"


def bleu(ref, gen):
    '''
    calculate pair wise bleu score. uses nltk implementation
    Args:
        references : a list of reference sentences
        candidates : a list of candidate(generated) sentences
    Returns:
        bleu score(float)
    '''
    ref_bleu = []
    gen_bleu = []
    for l in gen:
        gen_bleu.append(l.split())
    for i, l in enumerate(ref):
        ref_bleu.append([l.split()])
    cc = SmoothingFunction()
    score_bleu = corpus_bleu(ref_bleu, gen_bleu, weights=(
        0, 1, 0, 0), smoothing_function=cc.method4)
    return score_bleu


def rouge(ref, gen):
    '''
    Calculate the rouge score
    '''
    scorer = rouge_scorer.RougeScorer(['rougeL'], use_stemmer=True)
    score_rouge = scorer.score(ref, gen)

    return score_rouge


def expand_range(old_value):
    '''
    Expand the given value from a range between 0 ... 1 to 0 ... 5
    '''
    old_max = 1
    old_min = 0
    new_max = 5
    new_min = 0

    old_range = old_max - old_min
    new_range = new_max - new_min
    return (((old_value - old_min) * new_range) / old_range) + new_min


# Load the file with the evaluation questions and answers
eval_qs_file = open(eval_qs_filename, 'r')
eval_qs_data = json.load(eval_qs_file)

# Load the file with the team answers
team_qs_file = open(team_qs_filename, 'r')
team_qs_data = json.load(team_qs_file)

###
#
# Collect the bleu and rouge scores for each of the questions
#
###
bleu_score = 0
rouge_score = 0
valid_answers = 0
for i in range(len(eval_qs_data)):
    if len(team_qs_data[i]["Question"]) == 0:
        continue

    valid_answers += 1

    b_score = bleu([eval_qs_data[i]["Answer"]], [team_qs_data[i]["Answer"]])
    r_score = rouge(eval_qs_data[i]["Answer"], team_qs_data[i]["Answer"])

    bleu_score += b_score
    rouge_score += r_score["rougeL"].fmeasure

###
#
# Expand the scores to a value between 0 ... 5 and print the results
#
###
final_bleu_score = expand_range(bleu_score / valid_answers)
final_rouge_score = expand_range(rouge_score / valid_answers)
final_overall_score = (final_bleu_score + final_rouge_score) / 2
print("FILENAME: " + team_qs_filename)
print("BLEU_SCORE:  " + str(final_bleu_score))
print("ROUGE_SCORE: " + str(final_rouge_score))

print("FINAL_SCORE: " + str(final_overall_score))
