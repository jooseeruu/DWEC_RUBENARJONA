

---

### 1. ¿Qué es una SPA? 
Una **Single Page Application (SPA)** es una aplicación web que funciona dentro de una sola página HTML. El contenido se actualiza dinámicamente sin recargar la página, mejorando la experiencia del usuario y reduciendo los tiempos de carga.

**Características principales**:
- **Punto de entrada único**: Acceso a una única página HTML, sin necesidad de recargar nuevas páginas.
- **Carga dinámica**: Solo se actualizan las partes necesarias del contenido.
- **URLs dinámicas**: La URL puede cambiar según la navegación sin recargar la página.

**Tecnologías**:
- **AJAX** o **WebSocket** para la comunicación asincrónica con el servidor.
- **JavaScript** es esencial para gestionar la interactividad y actualización.
- Frameworks como **React**, **Angular**, o **Vue.js** ayudan a construir SPAs.

**Ventajas**:
- Mejora la velocidad de carga tras la inicial.
- Ofrece una navegación fluida y rápida.

**Desventajas**:
- Mayor complejidad en el desarrollo.
- SEO limitado, ya que el contenido dinámico puede no ser fácilmente indexado por motores de búsqueda.

---

### 2. ¿Qué es una MPA?
Una **Multi Page Application (MPA)** es una aplicación web compuesta de múltiples páginas HTML. Cada vez que el usuario navega a una nueva página, esta se solicita completamente al servidor.

**Características principales**:
- **Punto de entrada múltiple**: Cada página es independiente y requiere una recarga completa.
- **URLs únicas**: Cada página tiene su propia URL fija.
- **Carga completa**: Cada interacción implica recargar todo el contenido desde el servidor.

**Tecnologías**:
- **Enlaces tradicionales** y solicitudes HTTP completas.
- Uso de **HTML**, **CSS** y **JavaScript** en cada página independiente.

**Ventajas**:
- Mejor SEO: Cada página tiene su propia URL, facilitando la indexación.
- Simplicidad en la estructura, al tener páginas independientes.

**Desventajas**:
- Navegación más lenta debido a recargas constantes.
- Mayor carga en el servidor por las múltiples solicitudes de páginas.

---

### 3. ¿Qué es el SSR?
El **Server Side Rendering (SSR)** es un enfoque donde el servidor genera una página HTML completa para cada solicitud, en lugar de dejar que el navegador lo haga.

**Características principales**:
- **Renderizado en el servidor**: El contenido completo se genera antes de ser enviado al navegador.
- **SEO optimizado**: Las páginas completamente renderizadas son más fáciles de indexar.
- **Mayor rapidez en la carga inicial**: El contenido está disponible inmediatamente al cargar la página.

**Tecnologías**:
- Generación dinámica del HTML en el servidor usando lenguajes como **Node.js**, **PHP**, **Ruby** o **Python**.
- Frameworks como **Next.js** (React) y **Nuxt.js** (Vue.js) permiten implementar SSR fácilmente.

**Ventajas**:
- Mejora el SEO y el tiempo de carga inicial.
- Los usuarios sin JavaScript habilitado pueden acceder al contenido.

**Desventajas**:
- Aumenta la carga en el servidor.
- La interactividad en la página puede ser más lenta.

---

### 4. ¿Qué es una PWA?
Una **Progressive Web Application (PWA)** es una aplicación web que utiliza tecnologías modernas para ofrecer una experiencia similar a una app nativa. Puede funcionar offline, recibir notificaciones push y se puede instalar en dispositivos sin pasar por una tienda de apps.

**Características principales**:
- **Progresiva**: Funciona en cualquier navegador moderno.
- **Responsiva**: Se adapta a cualquier dispositivo y tamaño de pantalla.
- **Independiente de la conectividad**: Puede funcionar offline usando **Service Workers**.
- **Instalable**: Las PWAs pueden instalarse como apps nativas sin pasar por tiendas de aplicaciones.

**Tecnologías**:
- **Service Workers** para gestionar la caché y permitir funcionamiento offline.
- **Manifest JSON** para definir la presentación e instalación de la PWA.

**Ventajas**:
- Independencia de red: Funcionan offline o con mala conexión.
- Fácil instalación y compatibilidad cross-platform.

**Desventajas**:
- Acceso limitado a ciertas APIs del dispositivo.
- Funcionalidades limitadas en algunos dispositivos iOS.

---

### 5. ¿Qué es el CSR?
El **Client Side Rendering (CSR)** es un enfoque en el cual el renderizado de la interfaz de usuario ocurre en el navegador (cliente) en lugar de en el servidor. El HTML inicial suele ser mínimo, y luego el contenido dinámico se carga mediante JavaScript.

**Características principales**:
- **Renderizado en el cliente**: El navegador gestiona la generación y actualización del contenido dinámico.
- **Navegación rápida**: Las interacciones no requieren recargar la página.
- **Carga inicial lenta**: Requiere descargar y ejecutar todos los archivos de JavaScript antes de mostrar el contenido.

**Tecnologías**:
- **JavaScript** y frameworks como **React**, **Vue.js** o **Angular**.
- **AJAX** o **Fetch API** para solicitudes de datos asíncronas.

**Ventajas**:
- Experiencia de usuario fluida y altamente interactiva.
- Menor carga en el servidor.

**Desventajas**:
- SEO complicado debido a que las páginas iniciales son a menudo vacías.
- Mayor uso de recursos del cliente, especialmente en dispositivos de bajo rendimiento.

---

### 6. ¿Qué es una TWA?
Una **Trusted Web Activity (TWA)** permite integrar una **Progressive Web Application (PWA)** dentro de una aplicación Android nativa. Las TWAs permiten distribuir una PWA como si fuera una aplicación nativa a través de la **Google Play Store**.

**Características principales**:
- **Contenido web dentro de una app nativa**: Utiliza **Chrome Custom Tabs** para mostrar la PWA en pantalla completa.
- **Distribución en Google Play Store**: Permite que las PWAs se distribuyan como apps nativas.
- **Seguridad mediante HTTPS**: Todo el contenido debe servirse a través de HTTPS.

**Tecnologías**:
- **Service Workers** para la funcionalidad offline.
- **Manifest JSON** y **Digital Asset Links** para garantizar la seguridad y confiabilidad del dominio web.

**Ventajas**:
- Permite la distribución en la Play Store.
- Ofrece una experiencia nativa utilizando tecnologías web.

**Desventajas**:
- Limitaciones del navegador en comparación con una app nativa.
- Requiere que el contenido esté servido a través de HTTPS.



