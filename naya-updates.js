'use strict';

/*
  STOPAZ exhibition content update
  Source authority: "What Naya needs to do", complete document text retrieved 2026-09-24.
  This layer intentionally changes content only. It does not redesign existing pages,
  remove existing material, or activate the deferred "Antizionist crimes" section.
*/
(() => {
  const esc = (s) => String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const p = (text, cls='') => `<p class="${cls}" data-en="${esc(text)}">${esc(text)}</p>`;

  function installStyles() {
    if (document.getElementById('naya-content-update-styles')) return;
    const style = document.createElement('style');
    style.id = 'naya-content-update-styles';
    style.textContent = `
      .naya-eras-context summary{cursor:pointer;font:500 clamp(1.6rem,3vw,2.6rem)/1.2 var(--museum-serif,Georgia,serif);padding:1rem 0;color:#eee}
      .naya-eras-context .era-source-section{margin:2rem 0}
      .naya-section-links{display:flex;flex-wrap:wrap;gap:.7rem 1.4rem;margin-top:1.5rem}
      .naya-section-links a{color:#eee;text-underline-offset:5px}
      .naya-archive-guide{margin:1.5rem 0}
      .naya-archive-guide summary{cursor:pointer;padding:.8rem 0}
      .naya-archive-guide h3{font-size:1.3rem;margin-top:1rem}
      .era-libels-grid{grid-template-columns:1fr!important;gap:3rem!important}
      .era-libel-card{max-width:850px;width:100%;margin-inline:auto;scroll-margin-top:5rem}
      .era-libel-card p{line-height:1.7!important;max-width:78ch;margin:0 0 1.2rem!important}
      .naya-source-update{max-width:1180px;margin:clamp(4rem,8vw,8rem) auto;padding:0 clamp(1.1rem,4vw,3rem)}
      .naya-source-update .naya-kicker{font:500 .72rem/1.2 var(--museum-sans,"Source Sans 3",sans-serif);letter-spacing:.18em;text-transform:uppercase;color:#9d9da7;margin-bottom:1rem}
      .naya-source-update h2,.naya-source-update h3{font-family:var(--museum-serif,"Cormorant Garamond",serif);font-weight:500;color:#f0f0f2}
      .naya-source-update h2{font-size:clamp(2.25rem,5vw,4.6rem);line-height:.98;margin:0 0 1.3rem}
      .naya-source-update h3{font-size:clamp(1.5rem,2.4vw,2.15rem);line-height:1.05;margin:0 0 .8rem}
      .naya-source-update p{max-width:78ch;color:#d1d1d7;font:400 clamp(.98rem,1.08vw,1.08rem)/1.62 var(--museum-sans,"Source Sans 3",sans-serif);margin:.8rem 0}
      .naya-source-update .naya-lede{font-size:clamp(1.1rem,1.45vw,1.3rem);line-height:1.55;color:#eeeeef;max-width:70ch}
      .naya-archive-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.06);margin-top:2rem}
      .naya-archive-card{background:#17171a;padding:clamp(1.25rem,2.4vw,2rem);min-width:0}
      .naya-archive-card .naya-object-meta{display:flex;flex-wrap:wrap;gap:.45rem .8rem;font-size:.72rem;letter-spacing:.08em;text-transform:uppercase;color:#8f8f99;margin-bottom:.7rem}
      .naya-archive-card img{display:block;width:100%;height:auto;max-height:520px;object-fit:contain;background:#111114;margin:0 0 1.15rem}
      .naya-archive-card p{font-size:.96rem;line-height:1.55;margin:.55rem 0;max-width:none}
      .naya-archive-card .naya-verification{color:#a9a9b1;font-size:.83rem}
      .naya-marr-note{border-left:1px solid rgba(116,38,45,.8);padding-left:clamp(1rem,2vw,1.5rem);margin:1.25rem 0 0}
      .era-libel-card .naya-expanded-copy{margin-top:1rem;padding-top:1rem;border-top:1px solid rgba(255,255,255,.07)}
      .era-libel-card .naya-expanded-copy p{margin:.72rem 0}
      .home-source-context .three-eras-intro .naya-home-lede{font-size:clamp(1.05rem,1.45vw,1.24rem);line-height:1.56}
      @media(max-width:760px){.naya-archive-grid{grid-template-columns:1fr}.naya-source-update{margin:3.5rem auto}.naya-source-update p{line-height:1.58}}
    `;
    document.head.appendChild(style);
  }

  const sourceCopy = {
  "intro": [
    "For two thousand years, hatred of Jews has changed its language, its accusations, and its justifications, but not its target. How does this ancient hatred persist while continually taking new forms?",
    "This first-of-its-kind digital exhibition traces Jew-hatred across three distinct eras to reveal antizionism as the successor to antisemitism. In the first era, antijudaism, the Jew was condemned as the enemy of God. In the second, antisemitism, the Jew was cast as the enemy of race. And today, in the era of antizionism, Jews, through the Jewish state, are cast as violators of human rights—and therefore as enemies of humanity.",
    "Central to understanding this continuity is a recurring pattern: before society can vilify the Jew, it must first establish what it considers virtuous. The Jew is then accused of violating that virtue. When faith represented the highest moral good, the Jew was portrayed as the enemy of God. When race and nation became organizing ideals, the Jew was portrayed as their corrupting enemy. Today, as human rights have become a dominant moral ideal, the Jewish state is accused of committing humanity’s gravest crimes.",
    "This is what makes Jew-hatred so enduring and so difficult to recognize: it presents itself as a virtuous hatred. The Jew is not merely disliked but cast as a cosmic villain whose extermination becomes a moral act.",
    "Jew-hatred has occupied three eras. In the Christian world, the Jew was condemned as the enemy of God. In the age of race, he became the biological enemy of society. In the modern world, the object of condemnation is the Zionist who encapsulates colonialism, apartheid, genocide.",
    "These are the three eras of antijudaism, antisemitism, and antizionism: theological, racial, and human rights-coded expressions of an enduring hatred of Jews."
  ],
  "eras": [
    {
      "title": "Antijudaism",
      "paragraphs": [
        "For nearly two millennia, hatred of Jews was expressed primarily through the language of religion. In Christian Europe, where faith provided the dominant moral framework, the Jew was cast as the violator of what society held sacred: God, Christ, and Christian truth. Jews were accused of rejecting and killing Christ, desecrating the host, poisoning wells, conspiring against Christians, and murdering Christian children for their blood. These were not simply expressions of prejudice; they were libels that transformed the Jew into a cosmic villain—an enemy not merely of Christians, but of God Himself. Once the Jew was imagined as capable of the most monstrous crimes against the sacred, persecution could be understood not as cruelty, but as moral defense. Expulsions, forced conversions, segregation, massacres, and other forms of persecution could therefore be justified by those carrying them out as acts in service of a higher good. This established a pattern that would survive long after religious authority began to fade: first define the era’s highest virtue, then accuse the Jew of violating it. The language would change. The accusations would change. But the structure of the hatred would endure.",
        "Christian Europe placed the Jew within a sacred drama of betrayal and malevolence. Jews were blamed for the death of Christ, said to desecrate the Eucharist, poison wells, spread pestilence, murder Christian children, and consume their blood in secret rites. The blood libel endured for centuries because it made the Jew more than a theological dissenter. The Jew inhabited the medieval imagination as concealed, sacrilegious, and bloodthirsty. Unexplained death, disease, religious anxiety, and civic disorder could all be assigned to a Jewish conspiracy."
      ]
    },
    {
      "title": "Antisemitism",
      "paragraphs": [
        "Like antijudaism, which cast the Jew as a violator of society’s religious virtues, the antisemitic era recast the Jew as a violator of the virtues of an increasingly secular society. As European society shifted from a religious to a secular worldview, the moral framework changed—and the image of the Jew changed with it.",
        "The nineteenth century secularized this inheritance. Race, heredity, nationalism, economics, revolution, and pseudoscience supplied a modern explanation for Jewish evil. Jewishness became ineradicable. Baptism no longer offered escape, because the danger lay not in belief but in blood.",
        "The Jew could be financier and Bolshevik, cosmopolitan and separatist, revolutionary and reactionary, decadent and fanatical. The contradictions posed no difficulty. Antisemitism was capacious enough to make Jews responsible for whatever threatened order.",
        "The Protocols of the Elders of Zion gave this era its most enduring literary form. Forged in the Russian Empire, the text imagined modern history as the work of a hidden Jewish directorate manipulating finance, journalism, war, and government.",
        "Nazism carried racial antisemitism to its terminal conclusion. If Jewish existence constituted the danger, exclusion could never suffice. The Holocaust destroyed millions of Jews and rendered the explicit racial idiom of European antisemitism morally toxic."
      ]
    },
    {
      "title": "Antizionism",
      "paragraphs": [
        "The postwar world supplied a new moral language. Empires were collapsing, national liberation movements were overturning colonial rule, and racism had become one of the defining evils of the age. Apartheid came to symbolize legalized racial domination; genocide, humanity’s ultimate crime. Human rights emerged as the era’s defining moral virtue. And once again, the Jew was recast as its enemy. Now reimagined as Zionist, the Jew was accused of embodying the very evils the postwar world had learned to condemn: racism, colonialism, apartheid, and genocide.",
        "Jewish power became Zionist influence. Jewish conspiracy became the Zionist lobby. Jewish bloodlust became the deliberate killing of children. Jewish racial corruption became supremacy. Jewish national life became settler-colonialism. Jewish collective criminality became genocide.",
        "The older imagery no longer needed to announce itself as antisemitic. It could return under the language of anti-racism, decolonization, and human rights. The medieval Jew murdered the Christian child. The racial Jew corrupted the nation. The Zionist colonizes, segregates, and exterminates."
      ]
    }
  ],
  "framework": [
    "Antizionism demonizes the Jew through the Jewish nation-state. Like antijudaism and antisemitism before it, antizionism portrays its Jewish target, Israel, as the embodiment of evil. Today, that evil is defined through the language of human rights. Israel is therefore accused of the era’s worst moral crimes: racism, colonialism, apartheid, genocide, and Nazism.",
    "Although antizionism emerged as a full-scale ideological campaign in the Soviet Union after 1967, its roots appeared much earlier. Antizionist ideas can already be found in Lenin’s writings in 1903 and later in the 1952 show trial of Rudolf Slánský, the Jewish General Secretary of the Communist Party of Czechoslovakia, who was accused of participating in a “Zionist conspiracy” against the state and subsequently executed. Slogans such as “Zionism is racism” and “Israel is committing a genocide” come from the Soviet Union. Few know the history of antizionism.",
    "Follow the libels below to discover their history and the trail of harm each left behind."
  ],
  "libelIntro": [
    "Three core libels, colonialism, apartheid (racism) , and Genocide (Nazism)  have acquired exceptional authority within contemporary antizionism. They place Zionism inside the most discredited categories of the modern era. Israel appears not as a nation whose history, borders, governments, wars, or laws can be argued over, but as colonial seizure, racial domination, and exterminatory violence made permanent in political form."
  ],
  "libels": [
    {
      "title": "Colonialism",
      "id": "colonialism",
      "paragraphs": [
        "The colonizer libel developed gradually, beginning with the denial of Jewish peoplehood. Before Jews could be portrayed as foreign colonizers in their ancestral homeland, they first had to be stripped of their identity as a nation. This process can be traced to early Soviet Marxism. In 1903, Lenin attacked the idea of Jewish nationhood as “reactionary,” and in 1913 Stalin explicitly argued that Jews did not constitute a nation. The next step was to recast Zionism as colonialism. In the 1920s, the Soviet Yevsektsiya and its newspaper Der Emes portrayed Zionism as an instrument of British imperialism and Western capitalism. The formula was taking shape: deny Jewish nationhood, then redefine the Jewish national movement as a colonial project.",
        "During the era of decolonization, this accusation became more explicit. Fayez Sayegh’s Zionist Colonialism in Palestine (1965) and Maxime Rodinson’s “Israel: A Colonial-Settler State?” (1967) helped establish the colonial framework. After 1967, the Soviet Union amplified it internationally. In Beware: Zionism! (1969), Soviet propagandist Yuri Ivanov portrayed Zionism as a “colonial ideology” and a form of “aggressive colonial expansion in the Middle East.” His book placed Zionism within a larger system of Western imperialism and presented Israel as an instrument of foreign capitalist power. This framing was subsequently repeated and disseminated internationally through the Soviet antizionist propaganda apparatus.",
        "Settler-colonialism removes Zionism from the history of Jewish nationhood and places it within the history of European conquest. Jewish return becomes foreign settlement. Jewish continuity in the land becomes secondary to an account in which Zionism begins as an imported European project imposed upon an indigenous population.",
        "A pivotal text appeared in 1965, when Palestinian intellectual and diplomat Fayez Sayegh published Zionist Colonialism in Palestine through the PLO Research Center. However, Jews as invaders of Arab lands and colonizers existed not only well before Sayegh but more critically, before the re-establishment of Israel. Jews as invaders and occupiers in the context of the Levant first appeared in 1940/1941 when the Grand Mufti of Jerusalem, Haj Amin al-Husseini, traveled to Germany to meet with Hitler and high-ranking Nazi officials. Inspired by Nazi anti-Jewish propaganda, al-Husseini played a pivotal role in helping to translate into Arabic Nazi propaganda. By 1941, Arab broadcast radio spread the “invader” and “colonizer” libels, accusing Jews of wanting to take over Arab Lands and “colonize Palestine.” By 1971, the Soviets ran a sophisticated campaign against Israel, deploying the Zionism is racism and imperialism libels.",
        "Sayegh wrote during the great era of decolonization, when European empires were retreating across Africa and Asia and colonial rule had become synonymous with dispossession, racial hierarchy, and foreign domination. The power of the settler-colonialism lies in its ability to recast Jews as foreign interlopers, severing them from their historical connection to the land and erasing Jewish peoplehood from the story. The libel thus accomplished two things at once: it inverts history by denying Jewish nationhood,  while demonizing Jews through the dominant moral language of the postwar world—colonialism, racism, and oppression.",
        "The Nakba would become a central engine of the colonizer libel. The hundreds of thousands of Palestinian Arabs who fled during the 1948 war supplied the narrative with its defining image: the Palestinian refugee dispossessed by the Jewish settlers. Detached from the larger history of the war, competing national movements, Jewish displacement, and Jewish historical connection to the land, the Nakba could be organized into a simple moral structure: indigenous Palestinian → foreign Jewish settler → dispossession. In this formulation, the Nakba functions not merely as a Palestinian account of catastrophe and displacement but as the foundational evidence for interpreting Zionism itself as a project of settler conquest.",
        "The power of the settler-colonialism libel lies in its ability to recast Jews as foreign interlopers, severing them from their historical connection to the land and erasing Jewish peoplehood from the story. It therefore accomplishes two things at once: it inverts history by denying Jewish nationhood while demonizing Jews through the dominant moral language of the postwar world—colonialism, racism, and oppression."
      ]
    },
    {
      "title": "Apartheid and Racism Libels",
      "id": "apartheid",
      "paragraphs": [
        "The equation “Zionism = Racism” was crucial to the emerging apartheid charge. Apartheid South Africa had become the postwar world’s most recognizable symbol of institutionalized racism. By defining Zionism itself as a racist ideology, Soviet propaganda could place Israel within the same moral and political category as South Africa: colonialism became racial domination; racial domination became apartheid.",
        "The apartheid libel has a particularly traceable genealogy. It overlaps with the colonialism narrative we just mapped, but its history is distinct: the key move was to transform Zionism from a purported form of colonialism into a purported system of racial domination analogous to South Africa. One of the earliest explicit comparisons came not from Palestinian Arabs or the Soviet Union, but from Hendrik Verwoerd, the South African prime minister and principal architect of apartheid.",
        "Israel was then publicly opposing South African apartheid at the United Nations. In 1961 Verwoerd attacked Israel for doing so and compared Israel's creation to South Africa's own situation. The episode is important because during the early 1960s Israel was actually cultivating relationships with newly independent African states and taking an increasingly vocal anti-apartheid position. The apartheid libel gained particular traction with Fayez Sayegh’s Zionist Colonialism in Palestine, an instrumental in introducing the apartheid analogy into Palestinian advocacy and international institutions. Historian Nina Fischer's research concludes that Sayegh was “almost singlehandedly responsible for introducing the apartheid analogy at the United Nations.” In his 1965 Zionist Colonialism in Palestine, Sayegh already characterized Zionism in racial terms. His argument centered on what he called racial self-segregation, exclusiveness and supremacy. Importantly, this was before Israel occupied the West Bank and Gaza in 1967.",
        "The Soviet Union played an important role in systematizing and internationalizing the comparison of Zionism with apartheid, particularly in the 1970s. After 1967, Soviet propaganda increasingly argued that Zionism was not simply nationalism but an ideology of racial superiority. This made the South African analogy especially useful. Apartheid had become an internationally recognizable symbol of institutionalized racism; if Zionism could be defined as racism, Israel could then be placed in the same moral category as apartheid South Africa. As such, the apartheid libel relied heavily on the “Zionism is racism” charge.",
        "By the mid-1970s this comparison was explicit. One particularly important Soviet-bloc publication was Valery Skurlatov's Zionism and Apartheid (Сионизм и апартеид). Soviet propaganda literature used supposed parallels between Jewish “chosenness” and white supremacy to claim that Israel and South Africa were governed by analogous doctrines of racial separation. In August 1977, Soviet writer N. Oleynikov wrote through the official TASS news agency: “Tel Aviv and Pretoria are akin.”",
        "Apartheid converts political conflict into racial ontology.",
        "The word carries the memory of South Africa's system of legally enforced white supremacy. Applied to Israel in its maximal sense, it does not merely condemn discrimination, military occupation, unequal laws, or particular policies. It identifies Jewish sovereignty itself with racial domination.A state regarded as apartheid in its essence cannot be repaired by ordinary politics. Its governing principle must be abolished."
      ]
    },
    {
      "title": "Genocide",
      "id": "genocide",
      "paragraphs": [
        "After the 1967 Six-Day War, Soviet antizionist propaganda increasingly compared Israelis and Zionism with Nazi Germany. This matters enormously for the genocide genealogy because it supplied the necessary moral analogy: if Israelis could be represented as the ideological heirs or imitators of Nazis, Palestinian Arabs could correspondingly be represented as their victims. Soviet cartoons depicted Israeli soldiers with swastikas, SS imagery, jackboots, blood, executions, and concentration-camp associations. Scholarship on Soviet posters identifies the Israel–Nazi comparison as a recurring feature of the campaign.",
        "General Ion Pacepa, chief of Romania’s foreign intelligence service, played a significant role in Soviet bloc operations directed against Israel and the US. In 1978, he became the highest-ranking intelligence officer ever to defect from the Soviet sphere and, among many secret revelations, provided details of KGB operations against Israel. Pacepa says the chairman of the KGB, Yuri Andropov (later Leonid Brezhnev’s successor as General Secretary of the Soviet Communist Party), told him:",
        "“We needed to instill a Nazi-style hatred for the Jews throughout the Islamic world, and to turn this weapon of the emotions into a terrorist bloodbath against Israel and its main supporter, the United States.”",
        "To achieve its objectives, the Kremlin devised Operation SIG, a disinformation campaign intended “to turn the whole Islamic world against Israel and the US.” Pacepa reported that by 1978, under Operation SIG, the KGB had sent some 4,000 Soviet bloc “agents of influence” into Islamic countries to help achieve this. They also printed and circulated vast amounts of anti-Israel and anti-Jewish propaganda, including the fabricated, antisemitic text The Protocols of the Elders of Zion, translated into Arabic.",
        "During the 1970s, Soviet rhetoric increasingly combined several accusations that we've already been tracing separately:",
        "Israel = colonialism",
        "Zionism = racism",
        "Israel = Nazi-like aggressor",
        "These accusations reinforced one another. Palestinian Arabs could now be represented simultaneously as an indigenous population facing colonial dispossession, an Arab population subjected to racism, and a people facing Nazi-like violence. During the 1982 Lebanon War, the Soviet state moved from analogy to an explicit accusation of genocide. On June 6, the official Soviet news agency TASS accused Israel of pursuing: “genocide against the Arab people of Palestine” and described the objective as their: “physical extermination.” By 1984, the language becomes even more striking. The Soviet foreign-propaganda agency Novosti published an English-language pamphlet entitled Zionists Count on Terror. Izabella Tabarovsky has documented language in it including: “Genocide Israeli style,” “Zionist-engineered genocide” and even “the ‘final solution’ of the Palestinian question.”",
        "The term names the intentional destruction, in whole or in part, of a national, ethnic, racial, or religious group. Its application to Zionism itself carries a claim far beyond civilian death, unlawful killing, military excess, or war crimes.",
        "It attributes exterminatory purpose to Jewish sovereignty.",
        "The inversion is historically profound. Zionism arose from the repeated failure of European emancipation and became urgent amid the destruction of European Jewry. In antizionist thought, the political answer to Jewish vulnerability can instead be cast as the instrument of annihilation.",
        "The people upon whom genocide was inflicted become its exemplary perpetrators. Jewish refuge becomes colonial invasion. Jewish sovereignty becomes racial supremacy. Jewish self-defense becomes extermination."
      ]
    }
  ],
  "archive": [
    "Posters, photographs, pamphlets, newspapers, caricatures, broadcasts, and state publications show how antizionism was produced, circulated, and transmitted.",
    "Object\u000bWhat it depicts or contains, together with its title, date, location, and subject where known.",
    "Creator\u000bThe photographer, artist, writer, publisher, newspaper, political organization, government agency, or institution responsible for its production, accompanied by the biographical or information necessary to understand the object.",
    "Historical setting\u000bThe circumstances in which it appeared, its intended audience, the controversy to which it belonged, and its place within the wider history.",
    "Archive\u000bThe holding institution, collection or fonds, catalogue or accession number, permanent source, and rights or credit information wherever available."
  ]
};
  const paragraphs = values => values.map(text => p(text)).join('\n');
  const erasMarkup = () => '<div class="three-eras-intro" lang="en" dir="ltr">' + paragraphs(sourceCopy.intro) + '</div>' + sourceCopy.eras.map(era => '<div class="era-source-section" lang="en" dir="ltr"><h3>' + esc(era.title) + '</h3>' + paragraphs(era.paragraphs) + '</div>').join('');

  function updateHome() {
    const context = document.querySelector('.home-source-context');
    if (!context || context.dataset.nayaUpdated === '1') return;
    context.dataset.nayaUpdated = '1';
    const framework = document.querySelector('.home-framework');
    context.innerHTML = '<h2>The Three Eras of Jew-Hatred</h2>' + erasMarkup();
    if (framework) context.querySelector('.era-source-section').before(framework);
  }

  function updateAntisemitismPage() {
    if (!/antisemitism\.html$/i.test(location.pathname)) return;
    const main = document.querySelector('main');
    if (!main || document.getElementById('naya-marr-focus')) return;
    const firstExhibit = main.querySelector('.exhibition-section');
    const section = document.createElement('section');
    section.id = 'naya-marr-focus';
    section.className = 'naya-source-update genealogy-script';
    section.innerHTML = `
      <div class="naya-kicker" data-en="THE RACIAL TURN">THE RACIAL TURN</div>
      <h2 data-en="Wilhelm Marr and the New Vocabulary of Antisemitism">Wilhelm Marr and the New Vocabulary of Antisemitism</h2>
      ${p('The nineteenth century did not merely inherit older anti-Jewish accusations; it recoded them. Wilhelm Marr belongs at the center of that transition. In 1879 he helped popularize the term “antisemitism” as a political label, shifting the imagined Jewish danger from theology toward race, nation, heredity, and an allegedly permanent conflict between peoples.','naya-lede')}
      ${p('That linguistic change made conversion an inadequate answer to the antisemite’s charge. If Jewishness was treated as an inherited racial or national condition, baptism could no longer remove the supposed danger. The Jew could be portrayed as a biological, political, economic, and national antagonist at once.')}
      ${p('Marr therefore marks a useful threshold between the first and second eras of Jew-hatred: the target remained the Jew, but the governing moral and explanatory vocabulary became secular, racial, and nationalist.')}
    `;
    if (firstExhibit) firstExhibit.before(section); else main.appendChild(section);
  }

  const archiveObjects = [
  {
    "title": "“But He Does Not Listen to the UN…”",
    "img": "naya-nelyubin-un-1978.webp",
    "meta": "Fyodor F. Nelyubin with V. N. Suslov · design dated 1978; proof record 1980",
    "paragraphs": [
      "About the image: This is a Soviet propaganda poster directed against Israel, titled «А он — не слушает ООН…» (“But He Does Not Listen to the UN…”). It was created by Soviet artist Fyodor Fedorovich Nelyubin (Фёдор Фёдорович Нелюбин), with V. N. Suslov, and sources date the design to 1978; an archival/auction record identifies a 1980 proof printing. Because the United Nations represents an institution charged with upholding human rights, the wagging finger reprimanding Israel perfectly illustrates a central feature of antizionism: portraying Israel as a persistent violator of human rights."
    ]
  },
  {
    "title": "“Sew on this little piece too!”",
    "img": "naya-lisogorsky-colonial-cartoon.webp",
    "meta": "N. Lisogorsky · Soviet anti-Zionist cartoon",
    "paragraphs": [
      "Image: N. Lisogorsky, Soviet anti-Zionist cartoon. This Soviet political cartoon depicts Israel as an expansionist colonial power systematically consuming the Arab world. At the center, a seamstress operates a sewing machine emblazoned with a Star of David, the letters “USA,” and the words “Made in USA.” American dollars sit conspicuously beside her. An Israeli figure points toward a map labeled “Map of the Arab World,” instructing her to incorporate yet another piece into a second map labeled “Map of Greater Israel.”",
      "The caption reads: “Sew on this little piece too!”",
      "Israel does not merely occupy territory; it is portrayed as deliberately cutting pieces from the Arab world to construct an ever-expanding “Greater Israel.” The American-made sewing machine and money establish the United States as the power enabling this supposed project."
    ]
  },
  {
    "title": "“The Israeli Extremists’ Appetite”",
    "img": "naya-israeli-extremists-appetite.webp",
    "meta": "Sovetskaya Moldavia · June 4",
    "paragraphs": [
      "Image: “The Israeli Extremists’ Appetite”. Sovetskaya Moldavia, June 4. Soviet Union",
      "An Israeli general stretches his arms across a map labeled “Arab Countries,” visually transforming Israel into a voracious expansionist power. His exaggerated hands grasp the surrounding territory, while dark liquid drips from his fingers. The title—“The Israeli Extremists’ Appetite”—turns territorial ambition into a metaphor of insatiable hunger."
    ]
  },
  {
    "title": "“The Expansionists”",
    "img": "naya-expansionists-krokodil-1973.webp",
    "meta": "Krokodil · No. 20 · 1973",
    "paragraphs": [
      "Image: The cartoon is titled «Экспансионисты» (“The Expansionists”) and appeared in Krokodil, No. 20, 1973. The image depicts Israeli military figures drawing a proposed «Великий Израиль» (“Greater Israel”) across a “Map of the Middle East,” with the Star of David transformed into arrows extending outward.",
      "The Soviets initially painted Israel and Zionism as a “weapon of imperialism” thus laying the foundation for future antizionists to continue to accuse Israel of colonialism."
    ]
  },
  {
    "title": "May Day anti-Zionist display, Moscow",
    "img": "naya-sychov-moscow-1972.webp",
    "meta": "Generally identified with photographer Vladimir Sychov · 1972",
    "paragraphs": [
      "Image: This is a particularly well-documented example of Soviet antizionist propaganda from the Brezhnev period. The photograph is generally identified as having been taken by Soviet photographer Vladimir Sychov (Владимир Сычёв) at a May Day demonstration in Moscow in 1972. The centerpiece is a gigantic spider-like creature wearing a military-style cap marked with a Star of David. Its legs stretch across what resembles a globe or web. That combination is important. The propaganda does not merely criticize Israeli policy. It visually represents “Zionism” as a monstrous, predatory, transnational force extending its tentacles across the world. Izabella Tabarovsky describes precisely this photograph and notes the creature's exaggerated Jewish facial features, Star of David, and globe-like web."
    ]
  },
  {
    "title": "Zionist Colonialism in Palestine",
    "img": "naya-sayegh-1965.webp",
    "meta": "Fayez A. Sayegh · PLO Research Center · Beirut · September 1965 · Palestine Monographs No. 1",
    "paragraphs": [
      "Image: The original manuscript was published in Beirut in September 1965 by the Research Center of the Palestine Liberation Organization, as Palestine Monographs No. 1."
    ]
  },
  {
    "title": "Beware: Zionism!",
    "img": "naya-ivanov-beware-zionism-1969.webp",
    "meta": "Yuri Ivanov · Moscow · 1969",
    "paragraphs": [
      "Image: Published in Moscow by the Communist Party's political publishing house in 1969, Yuri Ivanov's Beware: Zionism! became an important text of the Soviet Union's post-1967 anti-Zionist campaign. Its subtitle—Essays on the Ideology, Organization, and Practice of Zionism—gave the work the appearance of political analysis. The first edition reportedly appeared in 100,000 copies, followed by a second edition of 200,000 copies in 1970."
    ]
  },
  {
    "title": "“Israel: A Colonial-Settler State?”",
    "img": "naya-rodinson-1967.webp",
    "meta": "Maxime Rodinson · 1967",
    "paragraphs": [
      "Image: In his influential 1967 essay, French Marxist scholar Maxime Rodinson reframed Zionism through the lens of European colonialism. Rather than understanding the Arab-Israeli conflict primarily as a struggle between competing national movements, Rodinson portrayed Jewish settlement in Palestine as part of the history of European colonial expansion."
    ]
  },
  {
    "title": "“Israeli Plan”",
    "img": "naya-cherepanov-israeli-plan-1979.webp",
    "meta": "Yuri Andreevich Cherepanov · 1979",
    "paragraphs": [
      "Image: “Israeli Plan,” Yuri Andreevich Cherepanov, 1979. In this Soviet cartoon, Israeli settlements are transformed into instruments of colonialism. A figure holds a document identifying a “Plan for the Construction of Israeli Military Settlements,” while fortified structures advance across the landscape. Barbed wire follows in their wake as Arab civilians are driven from the territory."
    ]
  },
  {
    "title": "Zionism = Racism",
    "img": "naya-efimovsky-zionism-racism-1976.webp",
    "meta": "Zh. (Joseph) Efimovsky · Combat Pencil · Leningrad · 1976",
    "paragraphs": [
      "Image: This is Zh. (Joseph) Efimovsky, Zionism = Racism (Сионизм — это расизм!), 1976, published by the Leningrad propaganda collective Боевой карандаш (Boевой Karandash / “Combat Pencil”). Published one year after the 1975 UN resolution declaring that “Zionism is a form of racism and racial discrimination,” Efimovsky’s poster translates that political formula into a stark visual image. An Arab man is shown restrained by a Star of David-shaped collar, transforming the Jewish symbol into an instrument of racial oppression."
    ]
  }
];

  function updateExhibition() {
    if (!/exhibition\.html$/i.test(location.pathname)) return;
    const libels = document.querySelector('.era-libels-section');
    if (!libels || libels.dataset.nayaUpdated === '1') return;
    libels.dataset.nayaUpdated = '1';

    const intro = document.createElement('section');
    intro.className = 'naya-source-update source-antizionism-framework';
    intro.id = 'antizionist-era';
    intro.lang = 'en';
    intro.dir = 'ltr';
    intro.innerHTML = '<h2>The Antizionist Era</h2>' + paragraphs(sourceCopy.framework) + '<h3>The Three Core Libels</h3>' + paragraphs(sourceCopy.libelIntro) + '<nav class="naya-section-links" aria-label="Explore the three libels"><a href="colonialism.html">Colonialism</a><a href="apartheid.html">Apartheid and racism</a><a href="genocide.html">Genocide</a><a href="#exhibition-archive">The archive</a></nav>';
    libels.before(intro);
    const grid = libels.querySelector('.era-libels-grid');
    grid.innerHTML = sourceCopy.libels.map((essay,i)=>'<article class="era-libel-card" id="'+essay.id+'" lang="en" dir="ltr"><span aria-hidden="true" class="era-structure-number">0'+(i+1)+'</span><h3>'+esc(essay.title)+'</h3>'+paragraphs(essay.paragraphs).replace('<p class="" data-en="Settler-colonialism removes', '<h4>Settler-Colonialism and Settlers</h4><p class="" data-en="Settler-colonialism removes')+'</article>').join('');
    const archive = document.createElement('section');
    archive.className = 'naya-source-update naya-archive-update';
    archive.id = 'exhibition-archive';
    archive.lang = 'en';
    archive.dir = 'ltr';
    archive.innerHTML = '<h2>The Archive</h2>' + p(sourceCopy.archive[0],'naya-lede') + '<details class="naya-archive-guide"><summary>How to read the archive</summary>'+ sourceCopy.archive.slice(1).map(text=>{const [label,...rest]=text.split('\u000b');return '<h3>'+esc(label)+'</h3> '+p(rest.join(' '));}).join('') + '</details><div class="naya-archive-grid">' + archiveObjects.map((o,i)=>'<article class="naya-archive-card"><img loading="lazy" decoding="async" src="'+esc(o.img)+'" alt="'+esc(o.title)+'"><div class="naya-object-meta"><span>Object '+String(i+1).padStart(2,'0')+'</span><span>'+esc(o.meta)+'</span></div><h3>'+esc(o.title)+'</h3>'+paragraphs(o.paragraphs)+'</article>').join('')+'</div>';
    libels.after(archive);
    libels.remove();
  }

  function run() {
    installStyles();
    updateHome();
    updateAntisemitismPage();
    updateExhibition();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, {once:true});
  else run();
})();
