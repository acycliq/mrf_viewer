// Written by build_data.py. Do not edit by hand.
window.BETA_VIEWER_DATA = {
 "controls": [
  "Method",
  "mrf_beta",
  "Filter"
 ],
 "buttons": {
  "Filter": {
   "none": {
    "group": "reads \u2265",
    "text": "0",
    "title": "every cell, none left out"
   },
   "reads \u2265 1": {
    "group": "reads \u2265",
    "text": "1",
    "title": "only cells with at least 1 read (2,768 left out)"
   },
   "reads \u2265 3": {
    "group": "reads \u2265",
    "text": "3",
    "title": "only cells with at least 3 reads (5,816 left out)"
   },
   "reads \u2265 5": {
    "group": "reads \u2265",
    "text": "5",
    "title": "only cells with at least 5 reads (8,515 left out)"
   },
   "reads \u2265 7": {
    "group": "reads \u2265",
    "text": "7",
    "title": "only cells with at least 7 reads (11,176 left out)"
   },
   "reads \u2265 10": {
    "group": "reads \u2265",
    "text": "10",
    "title": "only cells with at least 10 reads (15,017 left out)"
   },
   "corr > 0": {
    "group": "corr >",
    "text": "0",
    "title": "only cells MapMyCells could match, correlation above 0; the others got its default call (13,156 left out)"
   },
   "corr > 0.4": {
    "group": "corr >",
    "text": "0.4",
    "title": "only cells MapMyCells matched well, correlation above 0.4, the cut Allen uses (22,181 left out)"
   }
  }
 },
 "sliders": [
  "mrf_beta",
  "reads \u2265",
  "corr >"
 ],
 "runs": [
  {
   "id": "mrf_beta_0.0",
   "label": "pciSeq, mrf_beta 0.0",
   "choices": {
    "Method": "pciSeq",
    "mrf_beta": "0.0"
   }
  },
  {
   "id": "mrf_beta_0.5",
   "label": "pciSeq, mrf_beta 0.5",
   "choices": {
    "Method": "pciSeq",
    "mrf_beta": "0.5"
   }
  },
  {
   "id": "mrf_beta_1.0",
   "label": "pciSeq, mrf_beta 1.0",
   "choices": {
    "Method": "pciSeq",
    "mrf_beta": "1.0"
   }
  },
  {
   "id": "mrf_beta_1.5",
   "label": "pciSeq, mrf_beta 1.5",
   "choices": {
    "Method": "pciSeq",
    "mrf_beta": "1.5"
   }
  },
  {
   "id": "mapmycells_yao38_hard_seed11235",
   "label": "MapMyCells, yao38 hard, website seed",
   "choices": {
    "Method": "MapMyCells",
    "Filter": "none"
   }
  },
  {
   "id": "mapmycells_yao38_hard_seed11235_n1",
   "label": "MapMyCells, yao38 hard, website seed, reads \u2265 1",
   "choices": {
    "Method": "MapMyCells",
    "Filter": "reads \u2265 1"
   }
  },
  {
   "id": "mapmycells_yao38_hard_seed11235_n3",
   "label": "MapMyCells, yao38 hard, website seed, reads \u2265 3",
   "choices": {
    "Method": "MapMyCells",
    "Filter": "reads \u2265 3"
   }
  },
  {
   "id": "mapmycells_yao38_hard_seed11235_n5",
   "label": "MapMyCells, yao38 hard, website seed, reads \u2265 5",
   "choices": {
    "Method": "MapMyCells",
    "Filter": "reads \u2265 5"
   }
  },
  {
   "id": "mapmycells_yao38_hard_seed11235_n7",
   "label": "MapMyCells, yao38 hard, website seed, reads \u2265 7",
   "choices": {
    "Method": "MapMyCells",
    "Filter": "reads \u2265 7"
   }
  },
  {
   "id": "mapmycells_yao38_hard_seed11235_n10",
   "label": "MapMyCells, yao38 hard, website seed, reads \u2265 10",
   "choices": {
    "Method": "MapMyCells",
    "Filter": "reads \u2265 10"
   }
  },
  {
   "id": "mapmycells_yao38_hard_seed11235_corr0",
   "label": "MapMyCells, yao38 hard, website seed, corr > 0",
   "choices": {
    "Method": "MapMyCells",
    "Filter": "corr > 0"
   }
  },
  {
   "id": "mapmycells_yao38_hard_seed11235_corr0.4",
   "label": "MapMyCells, yao38 hard, website seed, corr > 0.4",
   "choices": {
    "Method": "MapMyCells",
    "Filter": "corr > 0.4"
   }
  }
 ],
 "pictureSize": {
  "width": 1054,
  "height": 1400
 },
 "allClassesFile": "All_classes.webp",
 "totalCells": {
  "mrf_beta_0.0": 37310,
  "mrf_beta_0.5": 37310,
  "mrf_beta_1.0": 37310,
  "mrf_beta_1.5": 37310,
  "mapmycells_yao38_hard_seed11235": 37310,
  "mapmycells_yao38_hard_seed11235_n1": 34542,
  "mapmycells_yao38_hard_seed11235_n3": 31494,
  "mapmycells_yao38_hard_seed11235_n5": 28795,
  "mapmycells_yao38_hard_seed11235_n7": 26134,
  "mapmycells_yao38_hard_seed11235_n10": 22293,
  "mapmycells_yao38_hard_seed11235_corr0": 24154,
  "mapmycells_yao38_hard_seed11235_corr0.4": 15129
 },
 "classes": [
  {
   "name": "Zero",
   "file": "Zero.webp",
   "colour": "#010101",
   "cells": {
    "mrf_beta_0.0": 12120,
    "mrf_beta_0.5": 12431,
    "mrf_beta_1.0": 9967,
    "mrf_beta_1.5": 7380,
    "mapmycells_yao38_hard_seed11235": 0,
    "mapmycells_yao38_hard_seed11235_n1": 0,
    "mapmycells_yao38_hard_seed11235_n3": 0,
    "mapmycells_yao38_hard_seed11235_n5": 0,
    "mapmycells_yao38_hard_seed11235_n7": 0,
    "mapmycells_yao38_hard_seed11235_n10": 0,
    "mapmycells_yao38_hard_seed11235_corr0": 0,
    "mapmycells_yao38_hard_seed11235_corr0.4": 0
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": false,
    "mapmycells_yao38_hard_seed11235_n1": false,
    "mapmycells_yao38_hard_seed11235_n3": false,
    "mapmycells_yao38_hard_seed11235_n5": false,
    "mapmycells_yao38_hard_seed11235_n7": false,
    "mapmycells_yao38_hard_seed11235_n10": false,
    "mapmycells_yao38_hard_seed11235_corr0": false,
    "mapmycells_yao38_hard_seed11235_corr0.4": false
   }
  },
  {
   "name": "319 Astro-TE NN",
   "file": "319_Astro-TE_NN.webp",
   "colour": "#be93e3",
   "cells": {
    "mrf_beta_0.0": 2890,
    "mrf_beta_0.5": 2931,
    "mrf_beta_1.0": 3284,
    "mrf_beta_1.5": 4098,
    "mapmycells_yao38_hard_seed11235": 3356,
    "mapmycells_yao38_hard_seed11235_n1": 3356,
    "mapmycells_yao38_hard_seed11235_n3": 3319,
    "mapmycells_yao38_hard_seed11235_n5": 3196,
    "mapmycells_yao38_hard_seed11235_n7": 2969,
    "mapmycells_yao38_hard_seed11235_n10": 2501,
    "mapmycells_yao38_hard_seed11235_corr0": 3356,
    "mapmycells_yao38_hard_seed11235_corr0.4": 3340
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "327 Oligo NN",
   "file": "327_Oligo_NN.webp",
   "colour": "#e56901",
   "cells": {
    "mrf_beta_0.0": 2389,
    "mrf_beta_0.5": 2231,
    "mrf_beta_1.0": 2057,
    "mrf_beta_1.5": 1875,
    "mapmycells_yao38_hard_seed11235": 1013,
    "mapmycells_yao38_hard_seed11235_n1": 1013,
    "mapmycells_yao38_hard_seed11235_n3": 987,
    "mapmycells_yao38_hard_seed11235_n5": 919,
    "mapmycells_yao38_hard_seed11235_n7": 820,
    "mapmycells_yao38_hard_seed11235_n10": 660,
    "mapmycells_yao38_hard_seed11235_corr0": 1013,
    "mapmycells_yao38_hard_seed11235_corr0.4": 348
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "037 DG Glut",
   "file": "037_DG_Glut.webp",
   "colour": "#cb3434",
   "cells": {
    "mrf_beta_0.0": 2327,
    "mrf_beta_0.5": 2544,
    "mrf_beta_1.0": 3193,
    "mrf_beta_1.5": 3495,
    "mapmycells_yao38_hard_seed11235": 1861,
    "mapmycells_yao38_hard_seed11235_n1": 1861,
    "mapmycells_yao38_hard_seed11235_n3": 1850,
    "mapmycells_yao38_hard_seed11235_n5": 1803,
    "mapmycells_yao38_hard_seed11235_n7": 1738,
    "mapmycells_yao38_hard_seed11235_n10": 1593,
    "mapmycells_yao38_hard_seed11235_corr0": 1858,
    "mapmycells_yao38_hard_seed11235_corr0.4": 1333
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "007 L2/3 IT CTX Glut",
   "file": "007_L2_3_IT_CTX_Glut.webp",
   "colour": "#cbba43",
   "cells": {
    "mrf_beta_0.0": 2185,
    "mrf_beta_0.5": 2468,
    "mrf_beta_1.0": 2759,
    "mrf_beta_1.5": 3064,
    "mapmycells_yao38_hard_seed11235": 1520,
    "mapmycells_yao38_hard_seed11235_n1": 1520,
    "mapmycells_yao38_hard_seed11235_n3": 1496,
    "mapmycells_yao38_hard_seed11235_n5": 1435,
    "mapmycells_yao38_hard_seed11235_n7": 1357,
    "mapmycells_yao38_hard_seed11235_n10": 1255,
    "mapmycells_yao38_hard_seed11235_corr0": 1345,
    "mapmycells_yao38_hard_seed11235_corr0.4": 726
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "030 L6 CT CTX Glut",
   "file": "030_L6_CT_CTX_Glut.webp",
   "colour": "#65a976",
   "cells": {
    "mrf_beta_0.0": 2034,
    "mrf_beta_0.5": 2383,
    "mrf_beta_1.0": 3245,
    "mrf_beta_1.5": 3777,
    "mapmycells_yao38_hard_seed11235": 2038,
    "mapmycells_yao38_hard_seed11235_n1": 2038,
    "mapmycells_yao38_hard_seed11235_n3": 2036,
    "mapmycells_yao38_hard_seed11235_n5": 2026,
    "mapmycells_yao38_hard_seed11235_n7": 2004,
    "mapmycells_yao38_hard_seed11235_n10": 1930,
    "mapmycells_yao38_hard_seed11235_corr0": 2038,
    "mapmycells_yao38_hard_seed11235_corr0.4": 1841
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "006 L4/5 IT CTX Glut",
   "file": "006_L4_5_IT_CTX_Glut.webp",
   "colour": "#218732",
   "cells": {
    "mrf_beta_0.0": 1938,
    "mrf_beta_0.5": 2052,
    "mrf_beta_1.0": 2581,
    "mrf_beta_1.5": 2791,
    "mapmycells_yao38_hard_seed11235": 1995,
    "mapmycells_yao38_hard_seed11235_n1": 1995,
    "mapmycells_yao38_hard_seed11235_n3": 1961,
    "mapmycells_yao38_hard_seed11235_n5": 1885,
    "mapmycells_yao38_hard_seed11235_n7": 1782,
    "mapmycells_yao38_hard_seed11235_n10": 1605,
    "mapmycells_yao38_hard_seed11235_corr0": 1785,
    "mapmycells_yao38_hard_seed11235_corr0.4": 662
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "017 CA3 Glut",
   "file": "017_CA3_Glut.webp",
   "colour": "#2aae89",
   "cells": {
    "mrf_beta_0.0": 1267,
    "mrf_beta_0.5": 1385,
    "mrf_beta_1.0": 1614,
    "mrf_beta_1.5": 1741,
    "mapmycells_yao38_hard_seed11235": 2840,
    "mapmycells_yao38_hard_seed11235_n1": 2840,
    "mapmycells_yao38_hard_seed11235_n3": 2736,
    "mapmycells_yao38_hard_seed11235_n5": 2522,
    "mapmycells_yao38_hard_seed11235_n7": 2282,
    "mapmycells_yao38_hard_seed11235_n10": 1926,
    "mapmycells_yao38_hard_seed11235_corr0": 1881,
    "mapmycells_yao38_hard_seed11235_corr0.4": 766
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "005 L5 IT CTX Glut",
   "file": "005_L5_IT_CTX_Glut.webp",
   "colour": "#65cbed",
   "cells": {
    "mrf_beta_0.0": 1210,
    "mrf_beta_0.5": 1247,
    "mrf_beta_1.0": 1377,
    "mrf_beta_1.5": 1455,
    "mapmycells_yao38_hard_seed11235": 875,
    "mapmycells_yao38_hard_seed11235_n1": 875,
    "mapmycells_yao38_hard_seed11235_n3": 870,
    "mapmycells_yao38_hard_seed11235_n5": 859,
    "mapmycells_yao38_hard_seed11235_n7": 826,
    "mapmycells_yao38_hard_seed11235_n10": 760,
    "mapmycells_yao38_hard_seed11235_corr0": 775,
    "mapmycells_yao38_hard_seed11235_corr0.4": 484
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "016 CA1-ProS Glut",
   "file": "016_CA1-ProS_Glut.webp",
   "colour": "#27a644",
   "cells": {
    "mrf_beta_0.0": 1015,
    "mrf_beta_0.5": 1228,
    "mrf_beta_1.0": 1624,
    "mrf_beta_1.5": 1849,
    "mapmycells_yao38_hard_seed11235": 1045,
    "mapmycells_yao38_hard_seed11235_n1": 1045,
    "mapmycells_yao38_hard_seed11235_n3": 1032,
    "mapmycells_yao38_hard_seed11235_n5": 993,
    "mapmycells_yao38_hard_seed11235_n7": 946,
    "mapmycells_yao38_hard_seed11235_n10": 886,
    "mapmycells_yao38_hard_seed11235_corr0": 937,
    "mapmycells_yao38_hard_seed11235_corr0.4": 594
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "004 L6 IT CTX Glut",
   "file": "004_L6_IT_CTX_Glut.webp",
   "colour": "#4376a9",
   "cells": {
    "mrf_beta_0.0": 900,
    "mrf_beta_0.5": 608,
    "mrf_beta_1.0": 372,
    "mrf_beta_1.5": 187,
    "mapmycells_yao38_hard_seed11235": 11903,
    "mapmycells_yao38_hard_seed11235_n1": 9135,
    "mapmycells_yao38_hard_seed11235_n3": 6568,
    "mapmycells_yao38_hard_seed11235_n5": 4933,
    "mapmycells_yao38_hard_seed11235_n7": 3808,
    "mapmycells_yao38_hard_seed11235_n10": 2745,
    "mapmycells_yao38_hard_seed11235_corr0": 2781,
    "mapmycells_yao38_hard_seed11235_corr0.4": 958
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "022 L5 ET CTX Glut",
   "file": "022_L5_ET_CTX_Glut.webp",
   "colour": "#ed6576",
   "cells": {
    "mrf_beta_0.0": 759,
    "mrf_beta_0.5": 769,
    "mrf_beta_1.0": 839,
    "mrf_beta_1.5": 1200,
    "mapmycells_yao38_hard_seed11235": 1268,
    "mapmycells_yao38_hard_seed11235_n1": 1268,
    "mapmycells_yao38_hard_seed11235_n3": 1219,
    "mapmycells_yao38_hard_seed11235_n5": 1139,
    "mapmycells_yao38_hard_seed11235_n7": 1041,
    "mapmycells_yao38_hard_seed11235_n10": 905,
    "mapmycells_yao38_hard_seed11235_corr0": 990,
    "mapmycells_yao38_hard_seed11235_corr0.4": 513
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "334 Microglia NN",
   "file": "334_Microglia_NN.webp",
   "colour": "#6c4949",
   "cells": {
    "mrf_beta_0.0": 710,
    "mrf_beta_0.5": 629,
    "mrf_beta_1.0": 527,
    "mrf_beta_1.5": 440,
    "mapmycells_yao38_hard_seed11235": 1455,
    "mapmycells_yao38_hard_seed11235_n1": 1455,
    "mapmycells_yao38_hard_seed11235_n3": 1408,
    "mapmycells_yao38_hard_seed11235_n5": 1327,
    "mapmycells_yao38_hard_seed11235_n7": 1194,
    "mapmycells_yao38_hard_seed11235_n10": 952,
    "mapmycells_yao38_hard_seed11235_corr0": 466,
    "mapmycells_yao38_hard_seed11235_corr0.4": 143
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "025 CA2-FC-IG Glut",
   "file": "025_CA2-FC-IG_Glut.webp",
   "colour": "#a3c301",
   "cells": {
    "mrf_beta_0.0": 618,
    "mrf_beta_0.5": 360,
    "mrf_beta_1.0": 340,
    "mrf_beta_1.5": 397,
    "mapmycells_yao38_hard_seed11235": 437,
    "mapmycells_yao38_hard_seed11235_n1": 437,
    "mapmycells_yao38_hard_seed11235_n3": 416,
    "mapmycells_yao38_hard_seed11235_n5": 401,
    "mapmycells_yao38_hard_seed11235_n7": 373,
    "mapmycells_yao38_hard_seed11235_n10": 317,
    "mapmycells_yao38_hard_seed11235_corr0": 349,
    "mapmycells_yao38_hard_seed11235_corr0.4": 185
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "333 Endo NN",
   "file": "333_Endo_NN.webp",
   "colour": "#9f6f37",
   "cells": {
    "mrf_beta_0.0": 540,
    "mrf_beta_0.5": 446,
    "mrf_beta_1.0": 321,
    "mrf_beta_1.5": 229,
    "mapmycells_yao38_hard_seed11235": 245,
    "mapmycells_yao38_hard_seed11235_n1": 245,
    "mapmycells_yao38_hard_seed11235_n3": 244,
    "mapmycells_yao38_hard_seed11235_n5": 223,
    "mapmycells_yao38_hard_seed11235_n7": 186,
    "mapmycells_yao38_hard_seed11235_n10": 127,
    "mapmycells_yao38_hard_seed11235_corr0": 245,
    "mapmycells_yao38_hard_seed11235_corr0.4": 245
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "326 OPC NN",
   "file": "326_OPC_NN.webp",
   "colour": "#cb5401",
   "cells": {
    "mrf_beta_0.0": 531,
    "mrf_beta_0.5": 443,
    "mrf_beta_1.0": 350,
    "mrf_beta_1.5": 345,
    "mapmycells_yao38_hard_seed11235": 238,
    "mapmycells_yao38_hard_seed11235_n1": 238,
    "mapmycells_yao38_hard_seed11235_n3": 231,
    "mapmycells_yao38_hard_seed11235_n5": 218,
    "mapmycells_yao38_hard_seed11235_n7": 204,
    "mapmycells_yao38_hard_seed11235_n10": 164,
    "mapmycells_yao38_hard_seed11235_corr0": 238,
    "mapmycells_yao38_hard_seed11235_corr0.4": 11
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "052 Pvalb Gaba",
   "file": "052_Pvalb_Gaba.webp",
   "colour": "#2e7efe",
   "cells": {
    "mrf_beta_0.0": 445,
    "mrf_beta_0.5": 431,
    "mrf_beta_1.0": 391,
    "mrf_beta_1.5": 371,
    "mapmycells_yao38_hard_seed11235": 308,
    "mapmycells_yao38_hard_seed11235_n1": 308,
    "mapmycells_yao38_hard_seed11235_n3": 308,
    "mapmycells_yao38_hard_seed11235_n5": 307,
    "mapmycells_yao38_hard_seed11235_n7": 302,
    "mapmycells_yao38_hard_seed11235_n10": 291,
    "mapmycells_yao38_hard_seed11235_corr0": 308,
    "mapmycells_yao38_hard_seed11235_corr0.4": 271
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "031 CT SUB Glut",
   "file": "031_CT_SUB_Glut.webp",
   "colour": "#4376a9",
   "cells": {
    "mrf_beta_0.0": 379,
    "mrf_beta_0.5": 165,
    "mrf_beta_1.0": 166,
    "mrf_beta_1.5": 405,
    "mapmycells_yao38_hard_seed11235": 10,
    "mapmycells_yao38_hard_seed11235_n1": 10,
    "mapmycells_yao38_hard_seed11235_n3": 10,
    "mapmycells_yao38_hard_seed11235_n5": 10,
    "mapmycells_yao38_hard_seed11235_n7": 10,
    "mapmycells_yao38_hard_seed11235_n10": 9,
    "mapmycells_yao38_hard_seed11235_corr0": 10,
    "mapmycells_yao38_hard_seed11235_corr0.4": 8
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "053 Sst Gaba",
   "file": "053_Sst_Gaba.webp",
   "colour": "#899832",
   "cells": {
    "mrf_beta_0.0": 375,
    "mrf_beta_0.5": 375,
    "mrf_beta_1.0": 360,
    "mrf_beta_1.5": 335,
    "mapmycells_yao38_hard_seed11235": 232,
    "mapmycells_yao38_hard_seed11235_n1": 232,
    "mapmycells_yao38_hard_seed11235_n3": 232,
    "mapmycells_yao38_hard_seed11235_n5": 232,
    "mapmycells_yao38_hard_seed11235_n7": 230,
    "mapmycells_yao38_hard_seed11235_n10": 221,
    "mapmycells_yao38_hard_seed11235_corr0": 232,
    "mapmycells_yao38_hard_seed11235_corr0.4": 218
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "330 VLMC NN",
   "file": "330_VLMC_NN.webp",
   "colour": "#d71c5f",
   "cells": {
    "mrf_beta_0.0": 279,
    "mrf_beta_0.5": 282,
    "mrf_beta_1.0": 346,
    "mrf_beta_1.5": 376,
    "mapmycells_yao38_hard_seed11235": 238,
    "mapmycells_yao38_hard_seed11235_n1": 238,
    "mapmycells_yao38_hard_seed11235_n3": 237,
    "mapmycells_yao38_hard_seed11235_n5": 227,
    "mapmycells_yao38_hard_seed11235_n7": 213,
    "mapmycells_yao38_hard_seed11235_n10": 167,
    "mapmycells_yao38_hard_seed11235_corr0": 238,
    "mapmycells_yao38_hard_seed11235_corr0.4": 235
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "029 L6b CTX Glut",
   "file": "029_L6b_CTX_Glut.webp",
   "colour": "#dc43a9",
   "cells": {
    "mrf_beta_0.0": 270,
    "mrf_beta_0.5": 184,
    "mrf_beta_1.0": 181,
    "mrf_beta_1.5": 185,
    "mapmycells_yao38_hard_seed11235": 376,
    "mapmycells_yao38_hard_seed11235_n1": 376,
    "mapmycells_yao38_hard_seed11235_n3": 372,
    "mapmycells_yao38_hard_seed11235_n5": 362,
    "mapmycells_yao38_hard_seed11235_n7": 341,
    "mapmycells_yao38_hard_seed11235_n10": 298,
    "mapmycells_yao38_hard_seed11235_corr0": 261,
    "mapmycells_yao38_hard_seed11235_corr0.4": 81
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "032 L5 NP CTX Glut",
   "file": "032_L5_NP_CTX_Glut.webp",
   "colour": "#65cbed",
   "cells": {
    "mrf_beta_0.0": 248,
    "mrf_beta_0.5": 225,
    "mrf_beta_1.0": 188,
    "mrf_beta_1.5": 144,
    "mapmycells_yao38_hard_seed11235": 233,
    "mapmycells_yao38_hard_seed11235_n1": 233,
    "mapmycells_yao38_hard_seed11235_n3": 233,
    "mapmycells_yao38_hard_seed11235_n5": 232,
    "mapmycells_yao38_hard_seed11235_n7": 230,
    "mapmycells_yao38_hard_seed11235_n10": 222,
    "mapmycells_yao38_hard_seed11235_corr0": 233,
    "mapmycells_yao38_hard_seed11235_corr0.4": 211
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "049 Lamp5 Gaba",
   "file": "049_Lamp5_Gaba.webp",
   "colour": "#c79afe",
   "cells": {
    "mrf_beta_0.0": 200,
    "mrf_beta_0.5": 187,
    "mrf_beta_1.0": 168,
    "mrf_beta_1.5": 158,
    "mapmycells_yao38_hard_seed11235": 198,
    "mapmycells_yao38_hard_seed11235_n1": 198,
    "mapmycells_yao38_hard_seed11235_n3": 198,
    "mapmycells_yao38_hard_seed11235_n5": 194,
    "mapmycells_yao38_hard_seed11235_n7": 192,
    "mapmycells_yao38_hard_seed11235_n10": 184,
    "mapmycells_yao38_hard_seed11235_corr0": 198,
    "mapmycells_yao38_hard_seed11235_corr0.4": 187
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "331 Peri NN",
   "file": "331_Peri_NN.webp",
   "colour": "#a93276",
   "cells": {
    "mrf_beta_0.0": 200,
    "mrf_beta_0.5": 159,
    "mrf_beta_1.0": 116,
    "mrf_beta_1.5": 83,
    "mapmycells_yao38_hard_seed11235": 201,
    "mapmycells_yao38_hard_seed11235_n1": 201,
    "mapmycells_yao38_hard_seed11235_n3": 201,
    "mapmycells_yao38_hard_seed11235_n5": 195,
    "mapmycells_yao38_hard_seed11235_n7": 184,
    "mapmycells_yao38_hard_seed11235_n10": 159,
    "mapmycells_yao38_hard_seed11235_corr0": 201,
    "mapmycells_yao38_hard_seed11235_corr0.4": 198
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "046 Vip Gaba",
   "file": "046_Vip_Gaba.webp",
   "colour": "#65cbed",
   "cells": {
    "mrf_beta_0.0": 183,
    "mrf_beta_0.5": 164,
    "mrf_beta_1.0": 142,
    "mrf_beta_1.5": 124,
    "mapmycells_yao38_hard_seed11235": 425,
    "mapmycells_yao38_hard_seed11235_n1": 425,
    "mapmycells_yao38_hard_seed11235_n3": 414,
    "mapmycells_yao38_hard_seed11235_n5": 393,
    "mapmycells_yao38_hard_seed11235_n7": 365,
    "mapmycells_yao38_hard_seed11235_n10": 304,
    "mapmycells_yao38_hard_seed11235_corr0": 387,
    "mapmycells_yao38_hard_seed11235_corr0.4": 235
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "045 OB-STR-CTX Inh IMN",
   "file": "045_OB-STR-CTX_Inh_IMN.webp",
   "colour": "#4376a9",
   "cells": {
    "mrf_beta_0.0": 171,
    "mrf_beta_0.5": 94,
    "mrf_beta_1.0": 38,
    "mrf_beta_1.5": 8,
    "mapmycells_yao38_hard_seed11235": 405,
    "mapmycells_yao38_hard_seed11235_n1": 405,
    "mapmycells_yao38_hard_seed11235_n3": 397,
    "mapmycells_yao38_hard_seed11235_n5": 380,
    "mapmycells_yao38_hard_seed11235_n7": 352,
    "mapmycells_yao38_hard_seed11235_n10": 288,
    "mapmycells_yao38_hard_seed11235_corr0": 405,
    "mapmycells_yao38_hard_seed11235_corr0.4": 405
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "047 Sncg Gaba",
   "file": "047_Sncg_Gaba.webp",
   "colour": "#218732",
   "cells": {
    "mrf_beta_0.0": 152,
    "mrf_beta_0.5": 153,
    "mrf_beta_1.0": 143,
    "mrf_beta_1.5": 161,
    "mapmycells_yao38_hard_seed11235": 104,
    "mapmycells_yao38_hard_seed11235_n1": 104,
    "mapmycells_yao38_hard_seed11235_n3": 104,
    "mapmycells_yao38_hard_seed11235_n5": 102,
    "mapmycells_yao38_hard_seed11235_n7": 99,
    "mapmycells_yao38_hard_seed11235_n10": 97,
    "mapmycells_yao38_hard_seed11235_corr0": 104,
    "mapmycells_yao38_hard_seed11235_corr0.4": 91
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "050 Lamp5 Lhx6 Gaba",
   "file": "050_Lamp5_Lhx6_Gaba.webp",
   "colour": "#c79afe",
   "cells": {
    "mrf_beta_0.0": 149,
    "mrf_beta_0.5": 140,
    "mrf_beta_1.0": 125,
    "mrf_beta_1.5": 112,
    "mapmycells_yao38_hard_seed11235": 146,
    "mapmycells_yao38_hard_seed11235_n1": 146,
    "mapmycells_yao38_hard_seed11235_n3": 141,
    "mapmycells_yao38_hard_seed11235_n5": 136,
    "mapmycells_yao38_hard_seed11235_n7": 130,
    "mapmycells_yao38_hard_seed11235_n10": 114,
    "mapmycells_yao38_hard_seed11235_corr0": 120,
    "mapmycells_yao38_hard_seed11235_corr0.4": 76
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "036 HPF CR Glut",
   "file": "036_HPF_CR_Glut.webp",
   "colour": "#a93276",
   "cells": {
    "mrf_beta_0.0": 148,
    "mrf_beta_0.5": 141,
    "mrf_beta_1.0": 166,
    "mrf_beta_1.5": 247,
    "mapmycells_yao38_hard_seed11235": 180,
    "mapmycells_yao38_hard_seed11235_n1": 180,
    "mapmycells_yao38_hard_seed11235_n3": 174,
    "mapmycells_yao38_hard_seed11235_n5": 166,
    "mapmycells_yao38_hard_seed11235_n7": 145,
    "mapmycells_yao38_hard_seed11235_n10": 117,
    "mapmycells_yao38_hard_seed11235_corr0": 180,
    "mapmycells_yao38_hard_seed11235_corr0.4": 180
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "048 RHP-COA Ndnf Gaba",
   "file": "048_RHP-COA_Ndnf_Gaba.webp",
   "colour": "#cbba43",
   "cells": {
    "mrf_beta_0.0": 144,
    "mrf_beta_0.5": 141,
    "mrf_beta_1.0": 140,
    "mrf_beta_1.5": 120,
    "mapmycells_yao38_hard_seed11235": 183,
    "mapmycells_yao38_hard_seed11235_n1": 183,
    "mapmycells_yao38_hard_seed11235_n3": 182,
    "mapmycells_yao38_hard_seed11235_n5": 180,
    "mapmycells_yao38_hard_seed11235_n7": 179,
    "mapmycells_yao38_hard_seed11235_n10": 168,
    "mapmycells_yao38_hard_seed11235_corr0": 183,
    "mapmycells_yao38_hard_seed11235_corr0.4": 162
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "038 DG-PIR Ex IMN",
   "file": "038_DG-PIR_Ex_IMN.webp",
   "colour": "#cb3232",
   "cells": {
    "mrf_beta_0.0": 130,
    "mrf_beta_0.5": 38,
    "mrf_beta_1.0": 15,
    "mrf_beta_1.5": 4,
    "mapmycells_yao38_hard_seed11235": 270,
    "mapmycells_yao38_hard_seed11235_n1": 270,
    "mapmycells_yao38_hard_seed11235_n3": 265,
    "mapmycells_yao38_hard_seed11235_n5": 250,
    "mapmycells_yao38_hard_seed11235_n7": 234,
    "mapmycells_yao38_hard_seed11235_n10": 185,
    "mapmycells_yao38_hard_seed11235_corr0": 270,
    "mapmycells_yao38_hard_seed11235_corr0.4": 91
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "051 Pvalb chandelier Gaba",
   "file": "051_Pvalb_chandelier_Gaba.webp",
   "colour": "#2e7efe",
   "cells": {
    "mrf_beta_0.0": 104,
    "mrf_beta_0.5": 95,
    "mrf_beta_1.0": 80,
    "mrf_beta_1.5": 74,
    "mapmycells_yao38_hard_seed11235": 7,
    "mapmycells_yao38_hard_seed11235_n1": 7,
    "mapmycells_yao38_hard_seed11235_n3": 7,
    "mapmycells_yao38_hard_seed11235_n5": 7,
    "mapmycells_yao38_hard_seed11235_n7": 7,
    "mapmycells_yao38_hard_seed11235_n10": 7,
    "mapmycells_yao38_hard_seed11235_corr0": 7,
    "mapmycells_yao38_hard_seed11235_corr0.4": 7
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "329 ABC NN",
   "file": "329_ABC_NN.webp",
   "colour": "#cbba43",
   "cells": {
    "mrf_beta_0.0": 84,
    "mrf_beta_0.5": 36,
    "mrf_beta_1.0": 12,
    "mrf_beta_1.5": 11,
    "mapmycells_yao38_hard_seed11235": 1347,
    "mapmycells_yao38_hard_seed11235_n1": 1347,
    "mapmycells_yao38_hard_seed11235_n3": 1291,
    "mapmycells_yao38_hard_seed11235_n5": 1203,
    "mapmycells_yao38_hard_seed11235_n7": 1072,
    "mapmycells_yao38_hard_seed11235_n10": 850,
    "mapmycells_yao38_hard_seed11235_corr0": 402,
    "mapmycells_yao38_hard_seed11235_corr0.4": 25
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "332 SMC NN",
   "file": "332_SMC_NN.webp",
   "colour": "#bababa",
   "cells": {
    "mrf_beta_0.0": 70,
    "mrf_beta_0.5": 44,
    "mrf_beta_1.0": 26,
    "mrf_beta_1.5": 23,
    "mapmycells_yao38_hard_seed11235": 190,
    "mapmycells_yao38_hard_seed11235_n1": 190,
    "mapmycells_yao38_hard_seed11235_n3": 188,
    "mapmycells_yao38_hard_seed11235_n5": 184,
    "mapmycells_yao38_hard_seed11235_n7": 176,
    "mapmycells_yao38_hard_seed11235_n10": 159,
    "mapmycells_yao38_hard_seed11235_corr0": 190,
    "mapmycells_yao38_hard_seed11235_corr0.4": 190
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "335 BAM NN",
   "file": "335_BAM_NN.webp",
   "colour": "#5498fe",
   "cells": {
    "mrf_beta_0.0": 59,
    "mrf_beta_0.5": 37,
    "mrf_beta_1.0": 14,
    "mrf_beta_1.5": 7,
    "mapmycells_yao38_hard_seed11235": 96,
    "mapmycells_yao38_hard_seed11235_n1": 96,
    "mapmycells_yao38_hard_seed11235_n3": 95,
    "mapmycells_yao38_hard_seed11235_n5": 89,
    "mapmycells_yao38_hard_seed11235_n7": 79,
    "mapmycells_yao38_hard_seed11235_n10": 69,
    "mapmycells_yao38_hard_seed11235_corr0": 96,
    "mapmycells_yao38_hard_seed11235_corr0.4": 39
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "056 Sst Chodl Gaba",
   "file": "056_Sst_Chodl_Gaba.webp",
   "colour": "#899832",
   "cells": {
    "mrf_beta_0.0": 53,
    "mrf_beta_0.5": 50,
    "mrf_beta_1.0": 40,
    "mrf_beta_1.5": 38,
    "mapmycells_yao38_hard_seed11235": 24,
    "mapmycells_yao38_hard_seed11235_n1": 24,
    "mapmycells_yao38_hard_seed11235_n3": 24,
    "mapmycells_yao38_hard_seed11235_n5": 20,
    "mapmycells_yao38_hard_seed11235_n7": 19,
    "mapmycells_yao38_hard_seed11235_n10": 16,
    "mapmycells_yao38_hard_seed11235_corr0": 24,
    "mapmycells_yao38_hard_seed11235_corr0.4": 23
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "338 Lymphoid NN",
   "file": "338_Lymphoid_NN.webp",
   "colour": "#dc43a9",
   "cells": {
    "mrf_beta_0.0": 15,
    "mrf_beta_0.5": 9,
    "mrf_beta_1.0": 1,
    "mrf_beta_1.5": 1,
    "mapmycells_yao38_hard_seed11235": 37,
    "mapmycells_yao38_hard_seed11235_n1": 37,
    "mapmycells_yao38_hard_seed11235_n3": 37,
    "mapmycells_yao38_hard_seed11235_n5": 37,
    "mapmycells_yao38_hard_seed11235_n7": 35,
    "mapmycells_yao38_hard_seed11235_n10": 33,
    "mapmycells_yao38_hard_seed11235_corr0": 37,
    "mapmycells_yao38_hard_seed11235_corr0.4": 37
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": true,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "337 DC NN",
   "file": "337_DC_NN.webp",
   "colour": "#fe9854",
   "cells": {
    "mrf_beta_0.0": 13,
    "mrf_beta_0.5": 3,
    "mrf_beta_1.0": 2,
    "mrf_beta_1.5": 0,
    "mapmycells_yao38_hard_seed11235": 6,
    "mapmycells_yao38_hard_seed11235_n1": 6,
    "mapmycells_yao38_hard_seed11235_n3": 6,
    "mapmycells_yao38_hard_seed11235_n5": 5,
    "mapmycells_yao38_hard_seed11235_n7": 5,
    "mapmycells_yao38_hard_seed11235_n10": 5,
    "mapmycells_yao38_hard_seed11235_corr0": 6,
    "mapmycells_yao38_hard_seed11235_corr0.4": 5
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": true,
    "mrf_beta_1.5": false,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "336 Monocytes NN",
   "file": "336_Monocytes_NN.webp",
   "colour": "#98dc54",
   "cells": {
    "mrf_beta_0.0": 6,
    "mrf_beta_0.5": 2,
    "mrf_beta_1.0": 0,
    "mrf_beta_1.5": 0,
    "mapmycells_yao38_hard_seed11235": 5,
    "mapmycells_yao38_hard_seed11235_n1": 5,
    "mapmycells_yao38_hard_seed11235_n3": 5,
    "mapmycells_yao38_hard_seed11235_n5": 5,
    "mapmycells_yao38_hard_seed11235_n7": 5,
    "mapmycells_yao38_hard_seed11235_n10": 4,
    "mapmycells_yao38_hard_seed11235_corr0": 5,
    "mapmycells_yao38_hard_seed11235_corr0.4": 5
   },
   "hasPicture": {
    "mrf_beta_0.0": true,
    "mrf_beta_0.5": true,
    "mrf_beta_1.0": false,
    "mrf_beta_1.5": false,
    "mapmycells_yao38_hard_seed11235": true,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  },
  {
   "name": "Unclassified (filtered out)",
   "keepLast": true,
   "file": "Unknown.webp",
   "colour": "#bfbfbf",
   "cells": {
    "mrf_beta_0.0": 0,
    "mrf_beta_0.5": 0,
    "mrf_beta_1.0": 0,
    "mrf_beta_1.5": 0,
    "mapmycells_yao38_hard_seed11235": 0,
    "mapmycells_yao38_hard_seed11235_n1": 2768,
    "mapmycells_yao38_hard_seed11235_n3": 5816,
    "mapmycells_yao38_hard_seed11235_n5": 8515,
    "mapmycells_yao38_hard_seed11235_n7": 11176,
    "mapmycells_yao38_hard_seed11235_n10": 15017,
    "mapmycells_yao38_hard_seed11235_corr0": 13156,
    "mapmycells_yao38_hard_seed11235_corr0.4": 22181
   },
   "hasPicture": {
    "mrf_beta_0.0": false,
    "mrf_beta_0.5": false,
    "mrf_beta_1.0": false,
    "mrf_beta_1.5": false,
    "mapmycells_yao38_hard_seed11235": false,
    "mapmycells_yao38_hard_seed11235_n1": true,
    "mapmycells_yao38_hard_seed11235_n3": true,
    "mapmycells_yao38_hard_seed11235_n5": true,
    "mapmycells_yao38_hard_seed11235_n7": true,
    "mapmycells_yao38_hard_seed11235_n10": true,
    "mapmycells_yao38_hard_seed11235_corr0": true,
    "mapmycells_yao38_hard_seed11235_corr0.4": true
   }
  }
 ]
};
