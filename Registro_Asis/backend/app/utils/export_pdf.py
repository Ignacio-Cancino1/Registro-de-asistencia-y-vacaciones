from fpdf import FPDF
from io import BytesIO

class PDF(FPDF):
    def __init__(self, title):
        super().__init__()
        self.title = title
        self.set_auto_page_break(auto=True, margin=15)

    def header(self):
        self.set_font('Arial', 'B', 12)
        self.cell(0, 10, self.title, border=False, ln=True, align='C')
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Página {self.page_no()}', 0, 0, 'C')

def generar_pdf(title, headers, data):
    pdf = PDF(title)
    pdf.add_page()
    pdf.set_font('Arial', '', 10)

    col_width = 190 / len(headers)
    th = 8

    for header in headers:
        pdf.cell(col_width, th, str(header), border=1)
    pdf.ln(th)

    for row in data:
        for item in row:
            pdf.cell(col_width, th, str(item), border=1)
        pdf.ln(th)

    # 🔧 Aquí corregimos el error: obtenemos el PDF como string binario
    pdf_output = BytesIO()
    pdf_output.write(pdf.output(dest='S').encode('latin1'))
    pdf_output.seek(0)
    return pdf_output
