--
-- PostgreSQL database dump
--

-- Dumped from database version 10.22 (Ubuntu 10.22-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.22 (Ubuntu 10.22-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    type integer NOT NULL,
    description character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: roles_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles_permissions (
    "permissionId" integer NOT NULL,
    "roleId" integer NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.roles_permissions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_roles (
    id integer NOT NULL,
    "roleId" integer,
    "userId" integer,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users_roles OWNER TO postgres;

--
-- Name: users_roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_roles_id_seq OWNER TO postgres;

--
-- Name: users_roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_roles_id_seq OWNED BY public.users_roles.id;


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: users_roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles ALTER COLUMN id SET DEFAULT nextval('public.users_roles_id_seq'::regclass);


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name, type, description, "createdAt", "updatedAt") FROM stdin;
79	admin	1	Main administrator	2022-09-02 12:59:58.544+03	2022-09-02 12:59:58.544+03
80	user	1	Simple user	2022-09-02 13:12:35.912+03	2022-09-02 13:12:35.912+03
81	addUsers	2	Create any users	2022-09-02 13:16:01.976+03	2022-09-02 13:16:01.976+03
82	updateUsers	2	Update users	2022-09-02 13:16:23.349+03	2022-09-02 13:16:23.349+03
83	deleteUsers	2	Delete users	2022-09-02 13:16:34.922+03	2022-09-02 13:16:34.922+03
84	viewUsers	2	View users and roles	2022-09-02 13:17:25.446+03	2022-09-02 13:17:25.446+03
85	hrManager	1	Human resources manager	2022-09-02 13:20:33.857+03	2022-09-02 13:20:33.857+03
86	addRoles	2	Create roles	2022-09-02 13:20:54.475+03	2022-09-02 13:20:54.475+03
87	deleteRoles	2	Delete roles	2022-09-02 13:21:07.16+03	2022-09-02 13:21:07.16+03
88	updateRoles	2	Update roles	2022-09-02 13:21:18.785+03	2022-09-02 13:21:18.785+03
89	updatePermissions	2	Update permissions	2022-09-02 13:21:34.161+03	2022-09-02 13:21:34.161+03
90	deletePermissions	2	Delete permissions	2022-09-02 13:21:55.224+03	2022-09-02 13:21:55.224+03
91	addPermissions	2	Create permissions	2022-09-02 13:22:16.589+03	2022-09-02 13:22:16.589+03
92	assignPermissions	2	Assign permissions to role	2022-09-02 13:22:50.129+03	2022-09-02 13:22:50.129+03
93	assignRole	2	Assign role to user	2022-09-02 13:23:07.521+03	2022-09-02 13:23:07.521+03
94	banned	1	Someone is banned	2022-09-02 13:26:02.685+03	2022-09-02 13:26:02.685+03
95	forBanned	2	Something for banned person	2022-09-02 13:26:30.528+03	2022-09-02 13:26:30.528+03
105	test1	1	Simple user	2022-09-07 08:02:28.06+03	2022-09-07 08:02:28.06+03
\.


--
-- Data for Name: roles_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles_permissions ("permissionId", "roleId", "updatedAt") FROM stdin;
81	79	2022-09-02 13:17:49.958+03
83	79	2022-09-02 13:17:49.958+03
82	79	2022-09-02 13:17:49.958+03
84	79	2022-09-02 13:17:49.958+03
84	80	2022-09-02 13:17:59.202+03
91	79	2022-09-02 13:23:20.276+03
86	79	2022-09-02 13:23:20.276+03
92	79	2022-09-02 13:23:20.276+03
93	79	2022-09-02 13:23:20.276+03
90	79	2022-09-02 13:23:20.276+03
87	79	2022-09-02 13:23:20.276+03
89	79	2022-09-02 13:23:20.276+03
88	79	2022-09-02 13:23:20.276+03
91	85	2022-09-02 13:23:46.463+03
92	85	2022-09-02 13:23:46.463+03
93	85	2022-09-02 13:23:46.463+03
84	85	2022-09-02 13:23:50.951+03
95	94	2022-09-02 13:26:38.771+03
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, name, "createdAt", "updatedAt") FROM stdin;
1338	user1@gmail.com	$2a$05$KEbO1snQr3HqdwWHyChoYeH.0R0tW1VlrM2iSR5SYkLj/m9XV.YtS	some body	2022-09-02 13:10:01.373+03	2022-09-02 13:10:01.373+03
1339	user2@aol.com	$2a$05$Kw7FTviRI2bkie.p4nv1s.AgPsua0d7vkCh4uxS4thDM9.gvdA1hu	Bobbie	2022-09-02 13:14:57.733+03	2022-09-02 13:38:38.889+03
1340	admin2@gmail.com	$2a$05$pETRZ/R9ftSVM.RFPvEyK.8w9PBtSJf3M2anQ8GEbKGP0zIkavi8C	Max Su	2022-09-02 15:02:33.37+03	2022-09-02 15:02:33.37+03
1337	admin8@gmail.com	$2a$05$7dbyI.eInwRZ2ROh7XeLK.ztl4afxXqvzbjHPRJN9zGSGAWdE.2CK	Max Su2	2022-09-02 12:53:33.529+03	2022-09-05 13:55:57.957+03
1346	user3@gmail.com	$2a$05$7N67akPFGix7ayoQe3Tnf.MEarRsJO8b8CED9FtZlpq9YZkKam.8K	some body33	2022-09-05 09:28:19.93+03	2022-09-05 14:20:21.379+03
1347	admin82@gmail.com	$2a$05$1GQN8yuhyi6eZHrn3LetSuNJrgD4UjMgBMvjNl0pIFFbtSBY2aOM2	John Lennon	2022-09-06 10:41:07.187+03	2022-09-06 10:41:07.187+03
1349	admin88@gmail.com	$2a$05$coiNTopKpYDqSMJD2znq1OegYr5xSi5flc4J9v3efp84uSLa61lQm	John Lennon	2022-09-08 08:44:26.135+03	2022-09-08 08:44:26.135+03
1350	admin823@gmail.com	$2a$05$6lju/kBvGjs3zJ8j2FfI6.XKETtsfnB8xwFmPTIzJ/Gx4TWsS6qaq	John Lennon	2022-09-20 08:44:40.523+03	2022-09-20 08:44:40.523+03
1361	kkk@hh.com	$2a$05$b2eMODEr46TcN3e2d5LOvu99QKnd4O6GgpcWLQK9Qb3u.YCPkyfnC	\N	2022-09-20 15:25:10.791+03	2022-09-20 15:25:10.791+03
1362	kaka@ss.com	$2a$05$F5lJhe.qobx9t.JUZHGEwug5Dk/KJIcPMtQtNMHwBx4YPG9vtZBfe	\N	2022-09-20 15:57:57.848+03	2022-09-20 15:57:57.848+03
1363	dd22@ss.com	$2a$05$wNKrkBNDSgJx4Bc31IjKfeM.riEvngAn2veBJsMM.yWjg3./cYcwG	\N	2022-09-20 15:59:22.14+03	2022-09-20 15:59:22.14+03
\.


--
-- Data for Name: users_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_roles (id, "roleId", "userId", "updatedAt") FROM stdin;
1371	79	1337	2022-09-02 13:07:22.209+03
1478	80	1361	2022-09-20 15:25:10.834+03
1376	79	1340	2022-09-02 15:02:41.445+03
1479	80	1362	2022-09-20 15:57:57.908+03
1480	80	1363	2022-09-20 15:59:22.158+03
1463	85	1347	2022-09-07 10:42:06.925+03
1464	85	1339	2022-09-07 10:42:06.926+03
1465	85	1338	2022-09-07 10:42:06.928+03
1466	80	1346	2022-09-07 10:46:12.765+03
1467	80	1349	2022-09-08 08:44:26.207+03
1468	80	1350	2022-09-20 08:44:40.625+03
\.


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 105, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1363, true);


--
-- Name: users_roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_roles_id_seq', 1480, true);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles_permissions roles_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_permissions
    ADD CONSTRAINT roles_permissions_pkey PRIMARY KEY ("permissionId", "roleId");


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_roles users_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT users_roles_pkey PRIMARY KEY (id);


--
-- Name: users_roles users_roles_roleId_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT "users_roles_roleId_userId_key" UNIQUE ("roleId", "userId");


--
-- Name: roles_permissions roles_permissions_permissionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_permissions
    ADD CONSTRAINT "roles_permissions_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: roles_permissions roles_permissions_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_permissions
    ADD CONSTRAINT "roles_permissions_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users_roles users_roles_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT "users_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public.roles(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users_roles users_roles_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_roles
    ADD CONSTRAINT "users_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

