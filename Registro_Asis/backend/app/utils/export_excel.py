import pandas as pd
from io import BytesIO

def generar_excel_asistencias(asistencias):
    data = [a.to_dict() for a in asistencias]
    df = pd.DataFrame(data)
    output = BytesIO()
    df.to_excel(output, index=False)
    output.seek(0)
    return output

def generar_excel_vacaciones(vacaciones):
    data = [v.to_dict() for v in vacaciones]
    df = pd.DataFrame(data)
    output = BytesIO()
    df.to_excel(output, index=False)
    output.seek(0)
    return output

def generar_excel_ausencias(ausencias):
    df = pd.DataFrame(ausencias)  # ausencias ya es una lista de dicts
    output = BytesIO()
    df.to_excel(output, index=False)
    output.seek(0)
    return output

def generar_excel_cumplimiento(cumplimientos):
    df = pd.DataFrame(cumplimientos)
    output = BytesIO()
    df.to_excel(output, index=False)
    output.seek(0)
    return output
