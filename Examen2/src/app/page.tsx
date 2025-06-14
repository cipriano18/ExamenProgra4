import { ArrowRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6 bg-gray-100">
      <div
        className="bg-gradient-to-r from-[#6c63ff] via-[#8B86FB] to-[#6c63ff]
             bg-[length:200%_200%] animate-bg-pan p-6 rounded-lg text-white"
      >
        <h1 className="text-4xl font-bold">FlowTasks</h1>
        <p>
          Tu centro de control para gestionar tareas con eficiencia y estilo.
        </p>
      </div>

      <div className="mt-6 flex grow flex-col gap-6 md:flex-row">
        <div className="flex flex-col justify-between rounded-lg bg-white shadow-md px-6 py-10 md:w-2/5 md:px-12 h-full">
          <p className="text-2xl text-gray-900 font-bold md:text-3xl leading-relaxed">
            Bienvenido a FlowTasks.
          </p>
          <p className="text-base text-gray-700 md:text-lg">
            Organice, priorice y dé seguimiento a sus tareas en un entorno
            flexible y eficiente. Con nuestra plataforma de administración de
            tareas, usted puede visualizar todas sus responsabilidades en un
            solo lugar y hacer seguimiento del progreso en tiempo real.
            Simplifique su flujo de trabajo, reduzca el estrés y aumente su
            productividad con herramientas diseñadas para adaptarse a su estilo
            de trabajo personal o en equipo.
            <br />
            <br />
          </p>

          <Link
            href="/ui/dashboard/Users"
            className="inline-flex items-center bg-gradient-to-r from-[#817BEA] via-[#5a54e6] to-[#6c63ff] text-white px-4 py-5 rounded hover:brightness-110 transition"

          >
            Ir al Dashboard
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
          <p className="text-sm text-gray-500">
            <strong>
              <br />
              <br />
              <br />
              <br />
              <br />
              Por:
            </strong>{" "}
            Makin Artavia, Reyner Rojas y Cipriano Rivera.
          </p>
        </div>

        <div className="flex items-center justify-center rounded-lg bg-white shadow-inner p-6 md:w-3/5 md:px-20 md:py-12">
          <img
            src="/homeImage.png"
            alt="Instant Analysis"
            style={{ width: "520px", height: "auto" }}
          />
        </div>
      </div>
    </main>
  );
}
